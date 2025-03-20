<script lang="ts">
	import Button from './button.svelte';

	let { click = () => {} }: { click?: Function } = $props();
</script>

<Button
	{click}
	disableDefaults={true}
	additionalStyle="rounded-full fixed p-4 bottom-8 right-8 flex items-center justify-center transition-colors"
>
	<span class="material-symbols-outlined">edit</span>
</Button>
