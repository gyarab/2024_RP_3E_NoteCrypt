<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './button.svelte';

	onMount(() => {
		const titleInput = document.getElementById('titleInput');
		if (titleInput) {
			titleInput.focus();
		}
	});

	let { close, save }: { close: Function; save: Function } = $props();

	let title = $state('');
	let content = $state('');
	let pin = $state('');

	function saveNote() {
		if (!title || !content) {
			return;
		}
		save(title, content, pin);
	}
</script>

<div class="mb-8 flex w-full items-center justify-center p-4">
	<div class="flex w-full flex-col md:w-2/3 xl:w-1/3">
		<div
			class="flex w-full items-center gap-2 rounded-t-lg bg-background-100 p-4 transition-colors"
		>
			<input
				bind:value={title}
				type="text"
				placeholder="Title"
				class="w-full grow bg-background-100 text-lg font-semibold text-text-800 outline-none transition-colors placeholder:text-text-200"
			/>
		</div>
		<textarea
			bind:value={content}
			class="h-48 resize-none rounded-b-lg bg-background-50 p-4 outline-none transition-colors placeholder:text-text-200"
			placeholder="Content"
		></textarea>

		<div class="flex w-full gap-2 mt-2">
			<Button colorScheme="accent" preset="skeleton" click={close} additionalStyle="w-1/4">
				<span class="material-symbols-outlined">delete</span>
			</Button>
			<Button colorScheme="primary" preset="fill" click={saveNote} additionalStyle="grow">
				<span class="material-symbols-outlined">save</span>
        <h3 class="font-semibold">Save</h3>
			</Button>
		</div>
	</div>
</div>
