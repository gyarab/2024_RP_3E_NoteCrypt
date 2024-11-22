<script>
	import Button from './button.svelte';
	import Sidebar from './sidebar.svelte';
	let darkMode = $state(false);
	let menuOpen = $state(false);

	function switchTheme() {
		darkMode = !darkMode;
		document.body.classList.toggle('dark');
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<nav
	class="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b-2 border-background-50 bg-background px-4 text-text-800 transition-all"
>
	<div class="flex gap-2">
		<Button icon="menu" css="" click={toggleMenu} />
		<h2 class="text-lg font-semibold">NoteCrypt</h2>
	</div>
	<Button icon="dark_mode" css="" fillIcon={darkMode} click={switchTheme} />
</nav>
<div class="h-16 w-full"></div>

<Sidebar bind:open={menuOpen} />
