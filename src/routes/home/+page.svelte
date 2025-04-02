<script lang="ts">
	import CreateNote from '$lib/components/createNote.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import Pinned from '$lib/components/pinned.svelte';
	import Recent from '$lib/components/recent.svelte';
	import Searchbar from '$lib/components/searchbar.svelte';
	import SectionTitle from '$lib/components/sectionTitle.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let innerWidth = $state(0);
	let { data }: { data: PageData } = $props();

	let editorOpen = $state(false);

	function openEditor() {
		editorOpen = true;
	}

	function closeEditor() {
		editorOpen = false;
	}

	async function deriveKey(pin: string): Promise<CryptoKey> {
		const enc = new TextEncoder();
		const salt = window.crypto.getRandomValues(new Uint8Array(16));

		const keyMaterial = await window.crypto.subtle.importKey(
			'raw',
			enc.encode(pin),
			{ name: 'PBKDF2' },
			false,
			['deriveKey']
		);

		return window.crypto.subtle.deriveKey(
			{
				name: 'PBKDF2',
				salt: salt,
				iterations: 100000,
				hash: 'SHA-256'
			},
			keyMaterial,
			{ name: 'AES-CBC', length: 256 },
			false,
			['encrypt', 'decrypt']
		);
	}

	async function encryptMessage(message: string, pin: string): Promise<string> {
		const key = await deriveKey(pin);
		const iv = window.crypto.getRandomValues(new Uint8Array(16));
		const enc = new TextEncoder();

		const encrypted = await window.crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv },
			key,
			enc.encode(message)
		);

		return `${btoa(String.fromCharCode(...iv))}:${btoa(String.fromCharCode(...new Uint8Array(encrypted)))}`;
	}

	async function save(title: string, content: string, pin: string) {
		const form = document.getElementById('saveForm') as HTMLFormElement;
		const titleInput = document.getElementById('titleInput') as HTMLInputElement;
		const contentInput = document.getElementById('contentInput') as HTMLInputElement;
		const encryptedInput = document.getElementById('encryptedInput') as HTMLInputElement;

		if (pin)
			encryptMessage(content, pin).then((encryptedContent) => {
				titleInput.value = title;
				contentInput.value = encryptedContent;
				encryptedInput.value = 'true';

				form.requestSubmit();
			});
		else {
			titleInput.value = title;
			contentInput.value = content;
			encryptedInput.value = 'false';

			form.requestSubmit();
		}
	}
</script>

<form id="saveForm" action="?/save" method="POST" hidden>
	<input type="text" name="title" id="titleInput" />
	<input type="text" name="content" id="contentInput" />
	<input type="text" name="encrypted" id="encryptedInput" />
</form>

<svelte:window bind:innerWidth />

<Navbar pageData={data} />

{#if editorOpen}
	<CreateNote close={closeEditor} {save} />
{/if}

<div class="md:mx-auto md:w-4/5">
	<Searchbar createButtonClick={openEditor} />
	<!-- <SectionTitle title="Pinned" icon="keep" /> -->
	<!-- <div -->
	<!-- 	class="mx-4 mb-8 flex gap-4 overflow-x-scroll rounded-lg bg-background-50 p-4 transition-colors" -->
	<!-- > -->
	<!-- 	{#each data.notes as note} -->
	<!-- 		<Pinned title={note.title} /> -->
	<!-- 	{/each} -->
	<!-- </div> -->
	<SectionTitle title="Recent" icon="history" />
	<div
		class="mx-4 mb-8 flex gap-4 overflow-x-scroll rounded-lg bg-background-50 p-4 transition-colors"
	>
		{#each data.notes as note}
			<Recent {note} />
		{/each}
	</div>
</div>
