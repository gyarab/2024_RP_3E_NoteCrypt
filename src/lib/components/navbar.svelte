<script>
	import Button from './button.svelte';
	import Sidebar from './sidebar.svelte';
	let darkMode = $state(true);
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
	class="fixed left-0 top-0 z-50 flex h-12 w-full items-center justify-between border-b-2 border-background-50 bg-background p-4 transition-all"
	id="navbar"
>
	<div class="flex gap-2">
		<Button icon="menu" css="" click={toggleMenu} />
		<h2 class="font-semibold">NoteCrypt</h2>
	</div>
	<Button icon="dark_mode" css="" fillIcon={darkMode} click={switchTheme} />
</nav>
<div class="h-12 w-full"></div>

<Sidebar bind:open={menuOpen} />
