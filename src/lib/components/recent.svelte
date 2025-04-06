<script lang="ts">
	import { onMount } from 'svelte';

	let { note, click }: { note: any; click: Function } = $props();
	const updated = new Date(note.updatedAt);
	let content = $state('');

	onMount(() => {
		if (!note.encrypted)
			fetch('/api/getNoteText?noteId=' + note.id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						content = data.content;
					} else {
						console.log('Error fetching note text:', data.content);
					}
				})
				.catch((error) => {
					console.log('Error fetching note data:', error);
				});
	});
</script>

<button
	onclick={() => click(note.id, note.encrypted)}
	class="flex aspect-square w-40 min-w-40 flex-col gap-1 rounded-lg border-2 border-secondary-200 bg-secondary-100 p-2 transition-colors hover:bg-secondary-200"
>
	<h3 class="max-w-full truncate font-semibold text-secondary">{note.title}</h3>
	<hr class="w-full border-t-2 border-secondary-200" />
	{#if !note.encrypted}
		<p class="line-clamp-4 max-h-full grow text-ellipsis text-start text-xs text-secondary-800">
			{content}
		</p>
	{:else}
		<div class="flex grow items-center justify-center">
			<h1 class="material-symbols-outlined text-5xl text-secondary">lock</h1>
		</div>
	{/if}
	<h4 class="self-end text-end text-sm font-bold text-secondary-200">
		{updated.getDate()}. {updated.getMonth() + 1}. {updated.getFullYear().toString().slice(2)}
		{updated.getHours()}:{updated.getMinutes()}
	</h4>
</button>
