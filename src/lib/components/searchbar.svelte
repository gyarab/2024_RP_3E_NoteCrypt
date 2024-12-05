<script>
	import Button from './button.svelte';
	let search = '';
</script>

<form onsubmit={() => alert(search)}>
	<div class="mb-4 flex w-full p-4">
		<input
			type="text"
			class="grow rounded-l-full bg-background-50 px-4 outline-none transition-colors placeholder:text-background-200"
			placeholder="Search your notes"
			bind:value={search}
		/>
		<input type="submit" class="hidden" />
		<button
			onclick={() => console.log(search)}
			class="flex items-center justify-center rounded-r-full bg-background-50 p-2 text-background-200 transition-colors"
		>
			<span class="material-symbols-outlined">search</span>
		</button>
	</div>
</form>
