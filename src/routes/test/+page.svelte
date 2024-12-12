<script lang="ts">
	import { type PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

{#if data.user}
	<button
		onclick={() => {
			console.log(data.user);
		}}>test</button
	>
{/if}
<br />
<form method="post">
	<button>sign out</button>
</form>
