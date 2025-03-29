<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div
	class="fixed flex h-screen w-screen flex-col items-center justify-center gap-16 bg-gradient-to-tr from-background to-background-100 p-4 md:flex-row"
>
	<div class="order-2 md:order-1">
		<h1 class="mb-1 text-5xl font-bold text-text-800 md:text-6xl">NoteCrypt</h1>
		<p class="mb-8 text-lg text-text-700 md:text-xl">
			Smart note-taking with encryption and organization.
		</p>

		{#if !data.user}
			<div class="mb-8 flex w-full space-x-4">
				<Button click={() => goto('/auth/signup')} additionalStyle="grow">
					<span class="material-symbols-outlined">person_add</span>
					<h3 class="font-semibold">Sign Up</h3>
				</Button>
				<Button click={() => goto('/auth/signin')} preset="skeleton" additionalStyle="grow">
					<span class="material-symbols-outlined">login</span>
					<h3 class="font-semibold">Sign In</h3>
				</Button>
			</div>
		{:else}
			<div class="mb-8 w-full">
				<Button click={() => goto('/home')} additionalStyle="w-full mb-2">My Dashboard</Button>
				<div class="flex justify-center gap-2">
					<form method="POST" class="flex justify-center gap-2">
						<p class="text-xs text-background-400">Logged in as {data.user.username}</p>
						<button class="text-xs text-accent underline">Sign out</button>
					</form>
				</div>
			</div>
		{/if}

		<ul class="mb-8 list-inside list-disc space-y-1 text-background-600">
			<li>Secure End-to-End Encryption</li>
			<li>Real-time Collaboration</li>
			<li>Sync Across All Devices</li>
			<li>Dark Mode & Custom Themes</li>
		</ul>

		<div class="text-sm text-background-400">Developed by: Kubík, Nikča, Šíma</div>
	</div>

	<div class="order-1 aspect-square max-h-64 max-w-64 grow rounded-lg bg-background-200 md:order-2">
		<!-- <img src="/lgntcr.png" alt="Note Crypt Logo" class="w-128 h-128 text-backround-800 rounded-lg outline" />  -->
	</div>
</div>
