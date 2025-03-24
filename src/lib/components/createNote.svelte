<script>
	import { onMount } from 'svelte';
	import Button from './button.svelte';

	onMount(() => {
		const titleInput = document.getElementById('titleInput');
		if (titleInput) {
			titleInput.focus();
		}
	});
</script>

<div class="mb-8 flex w-screen items-center justify-center p-4">
	<div class="flex w-full flex-col md:w-2/3 xl:w-1/3">
		<div
			class="flex w-full items-center gap-2 rounded-t-lg bg-background-100 p-4 transition-colors"
		>
			<input
				id="titleInput"
				type="text"
				placeholder="Title"
				class="w-full grow bg-background-100 text-lg font-semibold text-text-800 outline-none transition-colors placeholder:text-text-200"
			/>
			<Button colorScheme="secondary" preset="skeleton">
				<span class="material-symbols-outlined">delete</span>
			</Button>
			<Button colorScheme="primary" preset="fill">
				<span class="material-symbols-outlined">save</span>
			</Button>
		</div>
		<textarea
			class="h-48 resize-none rounded-b-lg bg-background-50 p-4 outline-none transition-colors placeholder:text-text-200"
			placeholder="Content"
		></textarea>
	</div>
</div>
