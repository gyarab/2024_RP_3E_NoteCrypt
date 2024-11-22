<script lang="ts">
	import Button from './button.svelte';

	let { open = $bindable(false) }: { open: boolean } = $props();
</script>

<div
	class="fixed bottom-0 left-0 top-0 z-30 flex h-full w-2/3 flex-col items-center bg-background-50 pt-16 text-text-800 transition-all {open
		? ''
		: '-translate-x-full'}"
>
	<Button icon="close" css="self-end m-4" click={() => (open = false)} />
	<Button icon="history" text="Recent" css="text-sm w-full p-4" />
	<Button icon="bookmark" text="Bookmarked" css="text-sm w-full p-4" />
	<Button icon="keep" text="Pinned" css="text-sm w-full p-4" />
	<div class="grow"></div>
	<div class="flex max-w-[75%] flex-col items-center">
		<span style="font-size:4rem" class="material-symbols-outlined fill -mb-2">person</span>
		<h2 class="max-w-full truncate font-bold">Skibidi sigma</h2>
		<h3 class="mb-4 max-w-full truncate text-xs text-primary-600">test@skibidi-sigma.example</h3>
	</div>
	<div class="grow"></div>
	<Button icon="settings" text="Settings" css="text-sm w-full p-4 mb-4" />
</div>
{#if open}
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		class="fixed bottom-0 left-0 right-0 top-0 z-20 bg-background opacity-80 transition-all"
		onclick={() => (open = false)}
	></button>
{/if}
