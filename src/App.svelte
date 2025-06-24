<script>
export let name;
</script>

<main>
<div id="warning">Silakan unggah gambar terlebih dahulu!</div>

<h1>TWIBBON {name}</h1>
<p>Tunjukkan dukungan Anda kepada Palestina dengan mengubah gambar profil Anda.</p>

<div id="canvasContainer">
<canvas id="twibbonCanvas" width="500" height="500"></canvas>
<div id="iconContainer">
<label id="iconLabel" for="uploadImage"><i class="fa fa-camera"></i></label>
<input type="file" id="uploadImage" accept="image/*" class="hidden" />
<input type="file" id="uploadTwibbon" accept="image/png" class="hidden" />
</div>
</div>

<div class="controls">
<button id="downloadBtn" class="hidden">Unduh</button>
<button id="shareBtn" class="hidden">Bagikan</button>
</div>

<div id="imgurResult"></div>
</main>

<footer style="margin-top: 0.5rem; padding: 1.5rem 1rem; background: #f5f5f5; color: #333; text-align: center; font-size: 0.95rem;">
<p>Solidaritas untuk Palestina. Dibuat dengan ❤️ oleh <a href="/" target="_blank" style="color: #007BFF; text-decoration: none;">VERDONKS</a>.</p>
</footer>

<style>
main {
width: 600px; 
margin: 5em auto; 
padding: 2em; 
background-color: #fdfdff; 
border-radius: 0.5em; box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02); 
} 
    
a:link, a:visited { 
color: #38488f; 
text-decoration: none; 
}

@media (min-width: 600px) {
.controls {
flex-direction: row;
justify-content: center;
}
}

@media (max-width: 700px) { 
main { 
margin: 0 auto; 
width: auto; 
} 
}
</style>
