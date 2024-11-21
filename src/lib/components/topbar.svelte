<script>
	import Button from './button.svelte';
	import Settings from './settings.svelte';
	let settingsOpen = false;

	function openSettings() {
		settingsOpen = true;
	}

	function closeSettings() {
		settingsOpen = false;
	}
</script>

<div class="flex h-10 gap-2 lg:gap-4">
	<div class="flex h-full w-full grow">
		<input
			type="text"
			placeholder="Search your notes"
			class="border-background-100 placeholder:text-primary bg-background-50 h-full w-0 grow rounded-l-full border-2 px-2"
		/>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			class="bg-background-100 text-primary hover:bg-primary-50 flex h-full w-10 items-center justify-center rounded-r-full text-center transition-colors hover:cursor-pointer"
			><span class="material-symbols-outlined">search</span></button
		>
	</div>
	<Button icon="settings" click={() => openSettings()} />
</div>

{#if settingsOpen}
	<Settings close={() => closeSettings()} />
{/if}
