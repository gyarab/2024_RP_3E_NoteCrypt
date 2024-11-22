<script lang="ts">
	let { title, icon }: { title: string; icon: string } = $props();
</script>

<div class="mb-1 ml-4 flex items-center gap-1 text-text-800 transition-colors">
	<span class="material-symbols-outlined">{icon}</span>
	<h2 class="font-semibold">{title}</h2>
</div>
