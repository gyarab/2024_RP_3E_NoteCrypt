<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from './button.svelte';

	let darkMode: boolean = $state(document.body.classList.contains('dark'));

	onMount(() => {
		window.scrollTo(0, 0);
		document.body.classList.add('overflow-hidden');
	});

	onDestroy(() => {
		document.body.classList.remove('overflow-hidden');
	});

	function switchTheme() {
		document.body.classList.toggle('dark');
		darkMode = !darkMode;
	}

	let { close }: { close: Function } = $props();
</script>

<div
	class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-opacity-50 {darkMode
		? 'bg-black'
		: 'bg-white'}"
>
	<div
		class="border-background-100 bg-background h-5/6 w-5/6 rounded-xl border-2 p-2 transition-colors lg:p-4"
	>
		<div class="flex items-center justify-between text-lg font-bold">
			<h2>Settings</h2>
			<div class="flex gap-4">
				<Button icon="dark_mode" fill={darkMode} click={() => switchTheme()} />
				<Button icon="close" click={() => close()} />
			</div>
		</div>
	</div>
</div>
