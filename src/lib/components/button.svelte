<script lang="ts">
	let { icon, click, fill = false, color = "" }: { icon: string; click: Function; fill?: boolean; color?: string } = $props();
</script>

<button
	class="{color ? color : "bg-background-100 text-primary hover:bg-primary-50 "} flex aspect-square h-10 items-center justify-center rounded-full transition-colors hover:cursor-pointer"
	onclick={() => click()}
	><span class={fill ? 'material-symbols-outlined fill' : 'material-symbols-outlined'}>{icon}</span
	></button
>
