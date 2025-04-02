<script lang="ts">
	let { title = 'Title' }: { title?: string } = $props();
</script>

<button
	class="flex aspect-square w-40 min-w-40 flex-col gap-1 rounded-lg border-2 border-secondary-200 bg-secondary-100 p-2 transition-colors hover:bg-secondary-200"
>
	<h3 class="max-w-full truncate font-semibold text-secondary">{title}</h3>
	<hr class="w-full border-t-2 border-secondary-200" />
	<p class="line-clamp-4 max-h-full text-ellipsis text-start text-xs">content</p>
	<div class="grow"></div>
	<span class="fill material-symbols-outlined self-end text-secondary-200" style="font-size:1.25rem"
		>keep</span
	>
</button>
