import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'EDITOR'
	}
});

export default app;
