<script lang="ts">
	import { onMount } from 'svelte';

	let { note }: { note: any } = $props();
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
						content = data.text;
					} else {
						console.log('Error fetching note text:', data.text);
					}
				})
				.catch((error) => {
					console.log('Error fetching note data:', error);
				});
	});
</script>

<button
	class="flex aspect-square w-40 min-w-40 flex-col gap-1 rounded-lg border-2 border-accent-200 bg-accent-100 p-2 transition-colors hover:bg-accent-200"
>
	<h3 class="max-w-full truncate font-semibold text-accent">{note.title}</h3>
	<hr class="w-full border-t-2 border-accent-200" />
	<p class="line-clamp-4 max-h-full text-ellipsis text-start text-xs">
		{content ? content : '...'}
	</p>
	<div class="grow"></div>
	<h4 class="self-end text-end text-sm font-bold text-accent-200">
		{updated.getDate()}. {updated.getMonth() + 1}. {updated.getFullYear().toString().slice(2)}
		{updated.getHours()}:{updated.getMinutes()}
	</h4>
</button>
