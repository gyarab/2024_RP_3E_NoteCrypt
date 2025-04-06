<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './button.svelte';
	import PinInput from './pinInput.svelte';

	let titleInput: HTMLInputElement;
	onMount(() => {
		if (titleInput) {
			titleInput.focus();
		}
	});

	let {
		close,
		save,
		closeButton,
		defaultTitle = '',
		defaultContent = '',
		deleteNote = close,
		noteId = '',
		pinNote = () => {},
		pinned = false
	}: {
		close: Function;
		save: Function;
		closeButton: boolean;
		defaultTitle?: string;
		defaultContent?: string;
		deleteNote?: Function;
		noteId?: string;
		pinNote?: Function;
		pinned?: boolean;
	} = $props();

	let title = $state(defaultTitle);
	let content = $state(defaultContent);

	let pinInputOpen = $state(false);

	function saveNote(pin: string | null) {
		if (!title || !content) {
			return;
		}
		save(title, content, pin, noteId);
	}
</script>

{#if pinInputOpen}
	<PinInput close={() => (pinInputOpen = false)} submit={saveNote} type="save" />
{/if}

<div class="mb-8 flex w-full items-center justify-center p-4">
	<div class="flex w-full flex-col md:w-2/3 xl:w-1/3">
		<div
			class="flex w-full items-center gap-2 rounded-t-lg bg-background-100 p-4 transition-colors"
		>
			<input
				bind:this={titleInput}
				bind:value={title}
				type="text"
				placeholder="Title"
				class="w-full grow bg-background-100 text-lg font-semibold text-text-800 outline-none transition-colors placeholder:text-text-200"
			/>
		</div>
		<textarea
			bind:value={content}
			class="h-64 resize-none rounded-b-lg bg-background-50 p-4 outline-none transition-colors placeholder:text-text-200"
			placeholder="Content"
		></textarea>

		<div class="mt-2 flex w-full gap-2">
			{#if closeButton}
				<Button colorScheme="secondary" preset="skeleton" click={close} additionalStyle="w-1/4">
					<span class="material-symbols-outlined">close</span>
				</Button>
			{/if}

			<Button
				colorScheme="accent"
				preset="skeleton"
				click={() => deleteNote(noteId)}
				additionalStyle=""
			>
				<span class="material-symbols-outlined">delete</span>
			</Button>
			<Button
				colorScheme="primary"
				preset="fill"
				click={() => {
					if (title && content) pinInputOpen = true;
				}}
				additionalStyle="grow"
			>
				<span class="material-symbols-outlined">save</span>
				<h3 class="font-semibold">Save</h3>
			</Button>

			{#if closeButton}
				<Button preset="borderless" click={pinNote}>
					<span class="material-symbols-outlined {pinned ? 'fill' : ''}">keep</span>
				</Button>
			{/if}
		</div>
	</div>
</div>
