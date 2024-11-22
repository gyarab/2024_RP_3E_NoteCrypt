<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './button.svelte';

	let { open = $bindable(false) }: { open: boolean } = $props();

	onMount(() => {
		window.addEventListener('click', (e) => {
			if (
				open &&
				!document.getElementById('sidebar')!.contains(e.target! as HTMLElement) &&
				!document.getElementById('navbar')!.contains(e.target! as HTMLElement)
			) {
				open = false;
			}
		});
	});
</script>

<div
	id="sidebar"
	class="fixed bottom-0 left-0 top-0 z-10 flex h-full w-2/3 flex-col items-center bg-background-50 pt-12 transition-all {open
		? ''
		: '-translate-x-full'}"
>
	<Button icon="close" css="self-end m-4" click={() => (open = false)} />
	<Button icon="history" text="Recent" css="text-sm w-full p-4" />
	<Button icon="bookmark" text="Bookmarked" css="text-sm w-full p-4" />
	<Button icon="keep" text="Pinned" css="text-sm w-full p-4" />
	<div class="grow"></div>
	<div class="flex flex-col items-center max-w-[75%]">
		<span style="font-size:4rem" class="material-symbols-outlined">person</span>
		<h2 class="font-bold truncate max-w-full">Skibidi sigma</h2>
		<h3 class="text-xs mb-4 truncate max-w-full font-semibold text-background-200">test@skibidi-sigma.example</h3>
	</div>
	<div class="grow"></div>
	<Button icon="settings" text="Settings" css="text-sm w-full p-4 mb-4" />
</div>
