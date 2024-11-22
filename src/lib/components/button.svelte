<script lang="ts">
	let {
		icon = '',
		text = '',
		click = () => {},
		css = null,
		fillIcon = false
	}: {
		icon?: string;
		text?: string;
		click?: Function;
		css?: string | null;
		fillIcon?: boolean;
	} = $props();
</script>

<button
	class="flex items-center justify-center gap-2 {css != null
		? css
		: 'rounded-lg border-2 border-background-100 bg-background-50 px-2 py-1 font-semibold text-text hover:bg-background-100'}"
	onclick={() => click()}
>
	{#if icon}
		<span class="material-symbols-outlined {fillIcon ? 'fill' : ''}">{icon}</span>
	{/if}
	{#if text}
		<h3>{text}</h3>
	{/if}
</button>
