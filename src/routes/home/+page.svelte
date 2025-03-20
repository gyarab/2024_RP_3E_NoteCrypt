<script lang="ts">
	import CreateButton from '$lib/components/createButton.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import Pinned from '$lib/components/pinned.svelte';
	import Recent from '$lib/components/recent.svelte';
	import Searchbar from '$lib/components/searchbar.svelte';
	import SectionTitle from '$lib/components/sectionTitle.svelte';
	import type { PageData } from './$types';

	let innerWidth = $state(0);
	let { data }: { data: PageData } = $props();

	function createNote() {
		console.log('create note');
	}
</script>

<svelte:window bind:innerWidth />

<Navbar pageData={data} />
<CreateButton click={createNote} />
<div class="md:mx-auto md:w-4/5">
	<Searchbar />
	<SectionTitle title="Pinned" icon="keep" />
	<div
		class="mx-4 mb-8 flex gap-4 overflow-x-scroll rounded-lg bg-background-50 p-4 transition-colors"
	>
		{#each Array.from({ length: 10 }) as _}
			<Pinned />
		{/each}
	</div>
	<SectionTitle title="Recent" icon="history" />
	<div
		class="mx-4 mb-8 flex gap-4 overflow-x-scroll rounded-lg bg-background-50 p-4 transition-colors"
	>
		{#each Array.from({ length: 10 }) as _}
			<Recent />
		{/each}
	</div>
</div>
