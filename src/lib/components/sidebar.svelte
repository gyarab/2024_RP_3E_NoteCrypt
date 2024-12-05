<script lang="ts">
	import Button from './button.svelte';

	let { open = $bindable(false) }: { open: boolean } = $props();
	let innerWidth = $state(0);

	$effect(() => {
		if (open && innerWidth < 1024) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<svelte:window bind:innerWidth />

<div
	class="fixed bottom-0 left-0 top-0 z-30 flex h-full w-2/3 flex-col items-center bg-background-50 pt-16 text-text-800 transition-all lg:w-72 {open
		? ''
		: '-translate-x-full'}"
>
	<Button
		click={() => (open = false)}
		preset="borderless"
		colorScheme="text800"
		additionalStyle="self-end mb-4"
	>
		<span class="material-symbols-outlined">close</span>
	</Button>
	<!-- <Button icon="history" text="Recent" css="text-sm w-full p-4" /> -->
	<Button preset="borderless" colorScheme="text800">
		<span class="material-symbols-outlined">history</span>
		<span>Recent</span>
	</Button>
	<hr class="my-1 w-1/4 border-t-2 border-background-200" />
	<Button preset="borderless" colorScheme="text800">
		<span class="material-symbols-outlined">bookmark</span>
		<span>Bookmarked</span>
	</Button>
	<hr class="my-1 w-1/4 border-t-2 border-background-200" />
	<Button preset="borderless" colorScheme="text800">
		<span class="material-symbols-outlined">keep</span>
		<span>Pinned</span>
	</Button>
	<div class="grow"></div>

	<Button preset="borderless" colorScheme="text800" disableDefaults={true} additionalStyle="flex transition-colors flex-col items-center rounded-lg p-2">
		<span style="font-size:4rem" class="material-symbols-outlined fill -mb-2">person</span>
		<h2 class="max-w-full truncate font-bold">Skibidi sigma</h2>
		<h3 class="mb-4 max-w-full truncate text-xs text-primary-600">test@skibidi-sigma.example</h3>
	</Button>

	<div class="grow"></div>
	<Button preset="borderless" additionalStyle="mb-8" colorScheme="text800">
		<span class="material-symbols-outlined">settings</span>
		<span>Settings</span>
	</Button>
</div>
{#if open}
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		class="fixed bottom-0 left-0 right-0 top-0 z-20 bg-background opacity-80 transition-all lg:hidden"
		onclick={() => (open = false)}
	></button>
{/if}
