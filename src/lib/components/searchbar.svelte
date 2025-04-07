<script lang="ts">
	import Button from './button.svelte';
	let search = $state('');

	$effect(() => {
    searchUpdated(search);
	});

	let {
		createButtonClick = () => {},
		editorOpen = false, 
    searchUpdated = () => {}
	}: { createButtonClick?: Function; editorOpen?: boolean, searchUpdated?: Function } = $props();
</script>

<div class="mx-auto mb-8 flex h-20 items-center justify-center p-4 md:w-1/3">
	{#if !editorOpen}
		<Button
			click={createButtonClick}
			disableDefaults={true}
			additionalStyle="rounded-full flex items-center justify-center h-full aspect-square mr-4 transition-colors"
		>
			<span class="material-symbols-outlined">add</span>
		</Button>
	{/if}
	<input
		type="text"
		class="h-full grow rounded-l-full bg-background-100 pl-4 outline-none transition-colors placeholder:text-primary-300"
		placeholder="Search your notes (titles only)"
		bind:value={search}
	/>
	<div
		class="flex h-full items-center justify-center rounded-r-full bg-background-100 pr-4 text-text-200 transition-colors"
	>
		<span class="material-symbols-outlined">search</span>
	</div>
</div>
