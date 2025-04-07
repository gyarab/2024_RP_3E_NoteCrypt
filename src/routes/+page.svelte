<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

  onMount(() => {
    document.body.classList.add('dark');
  });

</script>

<div
	class="fixed bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-8 bg-gradient-to-tr from-background to-background-100 p-4 md:flex-row md:gap-16"
>
	<div class="order-2 md:order-1">
		<h1 class="mb-1 text-center text-5xl font-bold text-text-800 md:text-start md:text-6xl">
			NoteCrypt
		</h1>
		<p class="mb-8 text-center text-lg text-text-700 md:text-start md:text-xl">
			We keep your notes under a lock.
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

		<ul class="mb-8 list-inside list-disc space-y-1 text-sm text-background-600 md:text-base">
			<li>Set PINs for your notes</li>
			<li>Client-side encryption</li>
			<li>Simple and easy to use UI</li>
		</ul>

		<div class="text-xs text-background-400 md:text-sm">Developed by: Kubík, Nikča, Šíma</div>
	</div>

	<div class="order-1 aspect-square max-h-48 max-w-48 grow md:order-2 md:max-h-64 md:max-w-64">
		<svg
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 604.000000 604.000000"
			preserveAspectRatio="xMidYMid meet"
			class="rounded-lg text-primary opacity-25"
		>
			<g
				transform="translate(0.000000,604.000000) scale(0.100000,-0.100000)"
				fill="currentColor"
				stroke="none"
			>
				<path
					d="M0 3020 l0 -3020 3020 0 3020 0 0 3020 0 3020 -3020 0 -3020 0 0
-3020z m3234 2411 c698 -308 1110 -458 1631 -590 l180 -46 3 -75 c9 -191 -31
-990 -63 -1273 -81 -704 -262 -1222 -594 -1697 l-66 -95 -5 825 -5 825 -23 57
c-49 120 -164 208 -299 228 -91 13 -1835 13 -1926 0 -135 -20 -250 -108 -299
-228 l-23 -57 -5 -845 -5 -844 -57 75 c-205 273 -392 656 -482 989 -113 418
-170 872 -186 1485 -5 198 -12 417 -16 486 -6 118 -5 128 12 137 11 5 109 33
219 62 530 138 982 301 1570 568 121 55 224 101 229 101 5 1 99 -39 210 -88z
m775 -2095 c65 -34 61 32 61 -1015 l0 -950 -92 -81 c-112 -97 -274 -215 -423
-306 -119 -73 -476 -251 -522 -260 -31 -6 -135 37 -333 136 -210 106 -438 253
-607 395 l-103 85 0 965 c0 1061 -4 996 59 1030 39 22 1919 22 1960 1z"
				/>
				<path
					d="M2295 3035 c-33 -32 -36 -120 -5 -153 l21 -22 718 0 718 0 21 23 c33
35 31 119 -3 152 l-24 25 -711 0 -711 0 -24 -25z"
				/>
				<path
					d="M2290 2600 c-28 -28 -28 -118 -1 -151 l19 -24 722 0 722 0 19 24 c27
33 27 123 -1 151 -20 20 -33 20 -740 20 -707 0 -720 0 -740 -20z"
				/>
				<path
					d="M2290 2200 c-31 -31 -28 -123 5 -155 l24 -25 366 0 366 0 24 25 c33
32 36 124 5 155 -19 19 -33 20 -395 20 -362 0 -376 -1 -395 -20z"
				/>
			</g>
		</svg>
	</div>
</div>
