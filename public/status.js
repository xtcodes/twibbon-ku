const statusDiv = document.createElement('div');
statusDiv.style.position = 'fixed';
statusDiv.style.bottom = '10px';
statusDiv.style.left = '50%';
statusDiv.style.transform = 'translateX(-50%)';
statusDiv.style.padding = '10px 20px';
statusDiv.style.borderRadius = '8px';
statusDiv.style.fontWeight = 'bold';
statusDiv.style.color = '#fff';
statusDiv.style.zIndex = '9999';
statusDiv.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
statusDiv.style.transition = 'all 0.3s ease';
document.body.appendChild(statusDiv);

function updateOnlineStatus() {
if (navigator.onLine) {
statusDiv.textContent = 'Anda sedang online';
statusDiv.style.backgroundColor = '#28a745';
statusDiv.style.opacity = '3';
} else {
statusDiv.textContent = 'Anda sedang offline';
statusDiv.style.backgroundColor = '#dc3545';
statusDiv.style.opacity = '3';
}

// Sembunyikan setelah 4 detik jika online
if (navigator.onLine) {
setTimeout(() => {
statusDiv.style.opacity = '0';
}, 4000);
}
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
window.addEventListener('load', updateOnlineStatus);
