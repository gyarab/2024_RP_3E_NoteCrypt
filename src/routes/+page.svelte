<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Searchbar from '$lib/components/searchbar.svelte';

	let innerWidth = $state(0);
</script>

<svelte:window bind:innerWidth />

{#if innerWidth >= 1024}
	<div class="">pc layout</div>
{:else}
	<Navbar />
	<Searchbar />
{/if}
