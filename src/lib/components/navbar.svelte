<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from '../../routes/$types';
	import Button from './button.svelte';
	import Sidebar from './sidebar.svelte';
	let menuOpen = $state(false);

	let { title = 'NoteCrypt', pageData }: { title?: string; pageData?: PageData } = $props();

	function switchTheme() {
		document.body.classList.toggle('dark');
		const darkMode = document.body.classList.contains('dark');

		document.cookie = `theme=${darkMode ? 'dark' : 'light'}; path=/; max-age=31536000`;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<nav
	class="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b-2 border-background-50 bg-background px-4 text-text-800 transition-colors"
>
	<div class="flex items-center gap-2">
		<Button click={toggleMenu} preset="borderless" colorScheme="text800">
			<span class="material-symbols-outlined">menu</span>
		</Button>
		<h2 class="text-lg font-semibold">{title}</h2>
	</div>
	<Button click={switchTheme} preset="borderless" colorScheme="text800">
		<span class="material-symbols-outlined">dark_mode</span>
	</Button>
</nav>
<div class="h-16 w-full"></div>

<Sidebar bind:open={menuOpen} {pageData} />
