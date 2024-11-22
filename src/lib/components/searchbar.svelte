<script>
	import Button from './button.svelte';
</script>

<div class="flex w-full p-4">
	<input
		type="text"
		class="grow rounded-l-full bg-background-50 px-4 transition-colors placeholder:text-background-200"
		placeholder="Search your notes"
	/>
	<Button icon="search" css="rounded-r-full bg-background-50 transition-colors p-2 text-background-200" />
</div>
