<script lang="ts">
	import Button from './button.svelte';
	let search = $state('');

	$effect(() => {
		console.log(search);
	});
</script>

<div class="mx-auto mb-8 flex h-20 items-center justify-center p-4 md:w-1/3">
	<!-- <div class="mr-4 h-full w-10 bg-white"></div> -->
	<Button
		disableDefaults={true}
		additionalStyle="rounded-full flex items-center justify-center h-full aspect-square mr-4 transition-colors"
	>
		<span class="material-symbols-outlined">add</span>
	</Button>
	<input
		type="text"
		class="h-full grow rounded-l-full bg-background-100 px-4 outline-none transition-colors placeholder:font-semibold placeholder:text-text-200"
		placeholder="Search your notes"
		bind:value={search}
	/>
	<div
		class="flex h-full items-center justify-center rounded-r-full bg-background-100 px-4 text-primary"
	>
		<span class="material-symbols-outlined">search</span>
	</div>
</div>
