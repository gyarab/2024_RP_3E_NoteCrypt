<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	let { children } = $props();
	onMount(() => {
		document.body.classList.add('bg-background');
		document.body.classList.add('text-text');
		document.body.classList.add('transition-colors');

		const match = document.cookie.match(/theme=(dark|light)/);
		if (match) {
			const darkMode = match[1] === 'dark';
			if (darkMode) {
				document.body.classList.add('dark');
			}
		}
	});
</script>

<svelte:head>
	<title>NoteCrypt</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

{@render children()}
