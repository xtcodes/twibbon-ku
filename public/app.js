const canvas = document.getElementById('twibbonCanvas');
const ctx = canvas.getContext('2d');
const uploadImage = document.getElementById('uploadImage');
const uploadTwibbon = document.getElementById('uploadTwibbon');
const iconLabel = document.getElementById('iconLabel');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const warning = document.getElementById('warning');
const twibbonImage = new Image();
twibbonImage.src = 'twibbon.png';

let userImage = null;
let isImageReady = false;
let scale = 1, lastScale = 1;
let translateX = 0, translateY = 0;
let lastX = 0, lastY = 0;
let isMouseDown = false;
let startX = 0, startY = 0;
let twibbonAlpha = 1;

function drawCanvas() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

if (userImage && isImageReady) {
ctx.save();
ctx.translate(translateX, translateY);
ctx.scale(scale, scale);
ctx.drawImage(userImage, 0, 0, userImage.width, userImage.height);
ctx.restore();
}

const isInteracting = isMouseDown || isTouchDragging;
const targetAlpha = isInteracting ? 0.4 : 1;
twibbonAlpha += (targetAlpha - twibbonAlpha) * 0.1;

ctx.save();
ctx.globalAlpha = twibbonAlpha;
ctx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height);
ctx.restore();
}

function animate() {
drawCanvas();
requestAnimationFrame(animate);
}

function showWarning(message = 'Silakan unggah gambar terlebih dahulu!') {
warning.textContent = message;
warning.style.display = 'block';
setTimeout(() => warning.style.display = 'none', 2500);
}

uploadImage.addEventListener('change', (e) => {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = function(evt) {
userImage = new Image();
userImage.onload = function() {
const scaleX = canvas.width / userImage.width;
const scaleY = canvas.height / userImage.height;
scale = Math.min(scaleX, scaleY);
const imageWidth = userImage.width * scale;
const imageHeight = userImage.height * scale;
translateX = (canvas.width - imageWidth) / 2;
translateY = (canvas.height - imageHeight) / 2;
isImageReady = true;

setTimeout(() => {
iconLabel.setAttribute('for', 'uploadTwibbon');
iconLabel.textContent = '◻';
downloadBtn.classList.remove('hidden');
shareBtn.classList.remove('hidden');
}, 100);
};
userImage.src = evt.target.result;
};
reader.readAsDataURL(file);
});

uploadTwibbon.addEventListener('change', (e) => {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = function(evt) {
const img = new Image();
img.onload = function() {
const tempCanvas = document.createElement('canvas');
tempCanvas.width = img.width;
tempCanvas.height = img.height;
const tempCtx = tempCanvas.getContext('2d');
tempCtx.drawImage(img, 0, 0);
const imgData = tempCtx.getImageData(0, 0, img.width, img.height);
let hasTransparent = false;
for (let i = 3; i < imgData.data.length; i += 4) {
if (imgData.data[i] < 255) {
hasTransparent = true;
break;
}
}
if (!hasTransparent) {
showWarning('Twibbon harus memiliki latar belakang transparan (PNG dengan transparansi)');
return;
}
twibbonImage.src = evt.target.result;
};
img.src = evt.target.result;
};
reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', () => {
if (!userImage) return showWarning();
const tempCanvas = drawToTempCanvas(true);
tempCanvas.toBlob(blob => {
uploadToImgur(blob);
const link = document.createElement('a');
link.download = 'twibbon-ku.png';
link.href = URL.createObjectURL(blob);
link.click();
});
});

shareBtn.addEventListener('click', () => {
if (!userImage) return showWarning();
const tempCanvas = drawToTempCanvas(true);
tempCanvas.toBlob(async (blob) => {
uploadToImgur(blob);
const file = new File([blob], "twibbon-ku.png", { type: "image/png" });
if (navigator.canShare && navigator.canShare({ files: [file] })) {
try {
await navigator.share({
files: [file],
title: "Twibbon Saya",
text: "Lihat Twibbon saya!",
});
} catch {
showWarning("Gagal membagikan.");
}
} else {
showWarning("Perangkat tidak mendukung fitur bagikan.");
}
});
});

function drawToTempCanvas(withWatermark = false) {
const tempCanvas = document.createElement('canvas');
tempCanvas.width = canvas.width;
tempCanvas.height = canvas.height;
const tempCtx = tempCanvas.getContext('2d');
if (userImage) {
tempCtx.save();
tempCtx.translate(translateX, translateY);
tempCtx.scale(scale, scale);
tempCtx.drawImage(userImage, 0, 0, userImage.width, userImage.height);
tempCtx.restore();
}
tempCtx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height);
if (withWatermark) {
tempCtx.fillStyle = "white";
tempCtx.font = "16px Arial";
tempCtx.textAlign = "right";
tempCtx.fillText("#MadeByXTCODES", canvas.width - 10, canvas.height - 10);
}
return tempCanvas;
}

function uploadToImgur(blob) {
const formData = new FormData();
formData.append("image", blob);
fetch("https://api.imgur.com/3/image", {
method: "POST",
headers: {
Authorization: "Client-ID bcaa7ea2665a124"
},
body: formData
})
.then(res => res.json())
.then(data => {
if (data.success) {
const link = data.data.link;
document.getElementById('imgurResult').innerHTML = `
<p><i class="fa fa-angle-double-right"></i> <b><a href="${link}" target="_blank">${link}</a></b> <i class="fa fa-clone" onclick="navigator.clipboard.writeText('${link}').then(() => showWarning('Tautan disalin!'))"></i></p>
`;
} else {
showWarning('Upload ke Imgur gagal.');
}
}).catch(() => {
showWarning('Gagal mengunggah ke Imgur.');
});
}

// Mouse & touch interaction
canvas.addEventListener('mousedown', (e) => {
isMouseDown = true;
startX = e.clientX - lastX;
startY = e.clientY - lastY;
});

canvas.addEventListener('mousemove', (e) => {
if (!isMouseDown) return;
translateX = e.clientX - startX;
translateY = e.clientY - startY;
lastX = translateX;
lastY = translateY;
});

canvas.addEventListener('mouseup', () => isMouseDown = false);
canvas.addEventListener('mouseleave', () => isMouseDown = false);

let isTouchDragging = false;
let touchStartX = 0, touchStartY = 0;
let touchLastScale = 1;
let initialDistance = 0;

function getDistance(touches) {
const dx = touches[0].clientX - touches[1].clientX;
const dy = touches[0].clientY - touches[1].clientY;
return Math.sqrt(dx * dx + dy * dy);
}

canvas.addEventListener('touchstart', (e) => {
if (e.touches.length === 1) {
isTouchDragging = true;
touchStartX = e.touches[0].clientX - lastX;
touchStartY = e.touches[0].clientY - lastY;
} else if (e.touches.length === 2) {
isTouchDragging = false;
initialDistance = getDistance(e.touches);
touchLastScale = scale;
}
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
e.preventDefault();
if (e.touches.length === 1 && isTouchDragging) {
const targetX = e.touches[0].clientX - touchStartX;
const targetY = e.touches[0].clientY - touchStartY;
translateX += (targetX - translateX) * 0.2;
translateY += (targetY - translateY) * 0.2;
lastX = translateX;
lastY = translateY;
} else if (e.touches.length === 2) {
const newDistance = getDistance(e.touches);
const targetScale = Math.max(0.5, Math.min(5, touchLastScale * (newDistance / initialDistance)));
scale += (targetScale - scale) * 0.2;
}
}, { passive: false });

canvas.addEventListener('touchend', () => {
isTouchDragging = false;
});

canvas.addEventListener('wheel', (e) => {
e.preventDefault();
const delta = e.deltaY < 0 ? 1.05 : 0.95;
scale *= delta;
scale = Math.max(0.5, Math.min(5, scale));
});

twibbonImage.onload = drawCanvas;
animate();
