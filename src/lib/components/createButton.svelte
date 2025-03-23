<script lang="ts">
	import Button from './button.svelte';

	let { click = () => {} }: { click?: Function } = $props();
</script>

<!-- <button
	class="mx-auto mb-4 flex items-center justify-center gap-2 rounded-full bg-primary p-2 text-background"
>
	<span class="material-symbols-outlined">add</span>
	<h3 class="font-semibold">New note</h3>
</button> -->

<Button
	additionalStyle="flex gap-2 justify-center py-2 px-4 transition-colors items-center mx-auto mb-4 rounded-full mb-8"
	disableDefaults={true}
	{click}
>
	<span class="material-symbols-outlined">add</span>
	<h3 class="font-semibold">New note</h3>
</Button>
