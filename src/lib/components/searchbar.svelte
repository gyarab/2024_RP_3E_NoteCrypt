<script>
	import Button from './button.svelte';
	let search = '';
</script>

<form onsubmit={() => alert(search)}>
	<div class="flex w-full p-4 mb-4">
		<input
			type="text"
			class="grow rounded-l-full bg-background-50 px-4 outline-none transition-colors placeholder:text-background-200"
			placeholder="Search your notes"
			bind:value={search}
		/>
		<input type="submit" class="hidden" />
		<Button
			icon="search"
			click={() => console.log(search)}
			css="rounded-r-full bg-background-50 transition-colors p-2 text-background-200"
		/>
	</div>
</form>
