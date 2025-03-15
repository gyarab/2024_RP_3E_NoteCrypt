<script lang="ts">
	import Button from '$lib/components/button.svelte';

	function buttonClick() {
		alert('Button clicked');
	}
</script>

<div
	class="w-scren order-2 flex h-screen flex-col items-center justify-center gap-16 bg-gradient-to-tr from-background to-background-100 p-4 md:flex-row"
>
	<div class="order-2 md:order-1">
		<h1 class="mb-1 text-5xl md:text-6xl font-bold text-text-800">NoteCrypt</h1>
		<p class="mb-8 text-lg md:text-xl text-text-700">Smart note-taking with encryption and organization.</p>

		<div class="mb-8 flex w-full space-x-4">
			<Button click={buttonClick} additionalStyle="grow">Sign Up</Button>
			<Button click={buttonClick} preset="skeleton" additionalStyle="grow">Sign In</Button>
		</div>

		<ul class="mb-8 list-inside list-disc space-y-1 text-background-600">
			<li>Secure End-to-End Encryption</li>
			<li>Real-time Collaboration</li>
			<li>Sync Across All Devices</li>
			<li>Dark Mode & Custom Themes</li>
		</ul>

		<div class="text-sm text-background-400">Developed by: Kubík, Nikča, Šíma</div>
	</div>

	<div class="order-1 h-64 w-64 rounded-lg bg-background-200 md:order-2">
		<!-- <img src="/lgntcr.png" alt="Note Crypt Logo" class="w-128 h-128 text-backround-800 rounded-lg outline" />  -->
	</div>
</div>
