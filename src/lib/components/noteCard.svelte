<script lang="ts">
	import { onMount } from 'svelte';

	let { note, click }: { note: any; click: Function } = $props();
	const updated = new Date(note.updatedAt);
</script>

<button
	onclick={() => click(note.id, note.encrypted, note.pinned)}
	class="flex h-32 min-w-32 max-w-96 grow flex-col gap-1 rounded-lg border-2 p-2 transition-colors {note.encrypted
		? 'border-accent-200 bg-accent-100 hover:bg-accent-200'
		: 'border-primary-200 bg-primary-100 hover:bg-primary-200'}"
>
	<h3
		class="max-w-full truncate text-sm font-semibold {note.encrypted
			? 'text-accent'
			: 'text-primary'}"
	>
		{note.title}
	</h3>
	{#if note.encrypted}
		<div class="flex grow w-full items-center justify-center">
			<h1 class="material-symbols-outlined text-4xl text-accent">lock</h1>
		</div>
	{:else}
		<div class="flex grow w-full items-center justify-center">
			<h1 class="material-symbols-outlined text-4xl text-text-800">lock_open</h1>
		</div>
	{/if}
	<h4
		class="self-end text-end text-sm font-bold {note.encrypted
			? 'text-accent-200'
			: 'text-primary-200'}"
	>
		{updated.getDate()}. {updated.getMonth() + 1}. {updated.getFullYear().toString().slice(2)}
		{updated.getHours()}:{updated.getMinutes()}
	</h4>
</button>
