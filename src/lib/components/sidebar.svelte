<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from '../../routes/$types';
	import Button from './button.svelte';

	let { open = $bindable(false), pageData }: { open: boolean; pageData?: PageData } = $props();
	let innerWidth = $state(0);

	$effect(() => {
		if (open && innerWidth < 1024) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});

	let signOutMenu = $state(false);
</script>

<svelte:window bind:innerWidth />

<div
	class="fixed bottom-0 left-0 top-0 z-40 flex h-full w-2/3 flex-col items-center bg-background-50 pt-16 text-text-800 transition-all md:w-72 {open
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

	<Button
		preset="borderless"
		colorScheme="text800"
		disableDefaults={true}
		additionalStyle="flex transition-colors flex-col items-center rounded-lg p-2"
		click={() => {
			signOutMenu = !signOutMenu;
		}}
	>
		<span style="font-size:4rem" class="material-symbols-outlined fill -mb-2">person</span>
		<h2 class="max-w-full truncate font-bold">
			{pageData?.user?.username ? pageData.user.username : 'User'}
		</h2>
		<h3 class="mb-4 max-w-full truncate text-xs text-primary-600">
			{pageData?.user?.email ? pageData.user.email : 'email@example.com'}
		</h3>
	</Button>

	{#if signOutMenu}
		<form method="POST" action="/">
			<Button preset="fill" colorScheme="accent" additionalStyle="mt-2">
				<span class="material-symbols-outlined">logout</span>
				<h2 class="max-w-full truncate font-bold">Sign Out</h2>
			</Button>
		</form>
	{/if}

	<div class="grow"></div>
  <h3 class="p-4 text-text-800 text-xs">Developed by Kubík, Nikča, Šíma</h3>
</div>
{#if open}
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		class="fixed bottom-0 left-0 right-0 top-0 z-30 bg-background opacity-80 transition-all lg:hidden"
		onclick={() => (open = false)}
	></button>
{/if}
