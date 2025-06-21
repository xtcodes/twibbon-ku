<script>
export let name;
</script>

<main>
<h1>Twibbon {name}!</h1>
<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

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
