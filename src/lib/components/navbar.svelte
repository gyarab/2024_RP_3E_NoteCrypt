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
	<div class="flex gap-2 items-center">
		<Button click={toggleMenu} preset="borderless" colorScheme="text800">
			<span class="material-symbols-outlined">menu</span>
		</Button>
		<h2 class="text-lg font-semibold">NoteCrypt</h2>
	</div>
	<Button click={switchTheme} preset="borderless" colorScheme="text800">
    <span class="material-symbols-outlined">dark_mode</span>
  </Button>
</nav>
<div class="h-16 w-full"></div>

<Sidebar bind:open={menuOpen} />
