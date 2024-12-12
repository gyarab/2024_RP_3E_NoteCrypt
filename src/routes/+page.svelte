<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Navbar from '$lib/components/navbar.svelte';

	function buttonClick() {
		alert('Button clicked');
	}
</script>

<Navbar />
<Button colorScheme="secondary" click={buttonClick} additionalStyle='m-2'>
	<span class="material-symbols-outlined">star</span>
	<h2 class="text-xl">Test tlacitko</h2>
</Button>
