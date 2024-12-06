<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	let { children } = $props();
	onMount(() => {
		//document.body.classList.add('dark');
		document.body.classList.add('bg-background');
		document.body.classList.add('text-text');
		document.body.classList.add('transition-colors');
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

{@render children()}
