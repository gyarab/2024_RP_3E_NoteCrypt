<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import NoteCard from '$lib/components/noteCard.svelte';
	import NoteEditor from '$lib/components/noteEditor.svelte';
	import PinInput from '$lib/components/pinInput.svelte';
	import Pinned from '$lib/components/pinned.svelte';
	import Recent from '$lib/components/recent.svelte';
	import Searchbar from '$lib/components/searchbar.svelte';
	import SectionTitle from '$lib/components/sectionTitle.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let innerWidth = $state(0);

	let editorOpen = $state(false);
	let editorCloseButton = $state(false);
	let pinInputOpen = $state(false);
	let incorrectPin = $state(false);

	let noteTitle = $state('');
	let noteContent = $state('');
	let currentNoteId = $state('');

	let saveForm: HTMLFormElement;
	let titleInput: HTMLInputElement;
	let contentInput: HTMLTextAreaElement;
	let encryptedInput: HTMLInputElement;
	let noteIdInput: HTMLInputElement;

	async function deriveKey(pin: string): Promise<CryptoKey> {
		const enc = new TextEncoder();
		const salt = Uint8Array.from(atob(data.user!.salt), (c) => c.charCodeAt(0));

		const keyMaterial = await crypto.subtle.importKey(
			'raw',
			enc.encode(pin),
			{ name: 'PBKDF2' },
			false,
			['deriveKey']
		);

		return crypto.subtle.deriveKey(
			{
				name: 'PBKDF2',
				salt,
				iterations: 100000,
				hash: 'SHA-256'
			},
			keyMaterial,
			{ name: 'AES-CBC', length: 256 },
			false,
			['encrypt', 'decrypt']
		);
	}

	async function encryptText(message: string, pin: string): Promise<string> {
		const key = await deriveKey(pin);
		const iv = crypto.getRandomValues(new Uint8Array(16));
		const enc = new TextEncoder();

		const encrypted = await crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv },
			key,
			enc.encode(message)
		);

		return `${btoa(String.fromCharCode(...iv))}:${btoa(String.fromCharCode(...new Uint8Array(encrypted)))}`;
	}

	async function decryptText(encryptedMessage: string, pin: string): Promise<string | null> {
		const [ivBase64, dataBase64] = encryptedMessage.split(':');
		if (!ivBase64 || !dataBase64) throw new Error('Invalid encrypted message format');

		const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));
		const encryptedData = Uint8Array.from(atob(dataBase64), (c) => c.charCodeAt(0));

		try {
			const key = await deriveKey(pin);
			const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, encryptedData);
			return new TextDecoder().decode(decrypted);
		} catch {
			return null;
		}
	}

	async function save(title: string, content: string, pin: string | null, noteId: string = '') {
		currentNoteId = noteId;

		if (pin) {
			const encryptedContent = await encryptText(content, pin);
			titleInput.value = title;
			contentInput.value = encryptedContent;
			encryptedInput.value = 'true';
			noteIdInput.value = noteId;
		} else {
			titleInput.value = title;
			contentInput.value = content;
			encryptedInput.value = 'false';
			noteIdInput.value = noteId;
		}

		saveForm.requestSubmit();
	}

	function openEditor(showCloseButton = false) {
		editorCloseButton = showCloseButton;
		editorOpen = true;
	}

	function closeEditor() {
		editorOpen = false;
	}

	function openPinInput(incorrect = false) {
		incorrectPin = incorrect;
		pinInputOpen = true;
	}

	function deleteNote(noteId: string | null = null) {
		closeEditor();
		if (!noteId) return;

		fetch(`/api/deleteNote?noteId=${noteId}`, { method: 'DELETE' })
			.then((res) => res.json())
			.then((data) => {
				data.msg === 'ok' ? location.reload() : console.error('Error deleting note:', data.msg);
			})
			.catch(console.error);
	}

	function getPinAndOpen(noteId: string, encrypted: boolean, pinned: boolean) {
		closeEditor();
		currentNoteId = noteId;
		notePinned = pinned;
		encrypted ? openPinInput(false) : openNote(noteId);
	}

	function openWithPin(pin: string) {
		pinInputOpen = false;
		openNote(currentNoteId, pin);
	}

	function deleteNoteFromPinInput() {
		pinInputOpen = false;
		deleteNote(currentNoteId);
	}

	function openNote(noteId: string, pin: string | null = null) {
		closeEditor();

		fetch(`/api/getNoteText?noteId=${noteId}`)
			.then((res) => res.json())
			.then((data) => {
				if (!data.success) return console.error('Error fetching note text:', data.content);

				noteTitle = data.title;

				if (!pin) {
					noteContent = data.content;
					openEditor(true);
					return;
				}

				decryptText(data.content, pin).then((decrypted) => {
					if (decrypted) {
						noteContent = decrypted;
						openEditor(true);
					} else {
						console.warn('Incorrect PIN');
						openPinInput(true);
					}
				});
			})
			.catch(console.error);
	}

	let pinnedNotes = $state(data.notes.filter((note) => note.pinned));
	let notePinned = $state(false);
	function pinNote() {
		notePinned = !notePinned;
		console.log('Pin note:', notePinned);

		console.log(data.notes.find((note) => note.id === currentNoteId));

		if (notePinned) {
			pinnedNotes.push(data.notes.find((note) => note.id === currentNoteId)!);
		} else {
			pinnedNotes = pinnedNotes.filter((note: any) => note.id !== currentNoteId);
		}

		fetch(`/api/pinNote?noteId=${currentNoteId}&pinned=${notePinned}`, { method: 'GET' })
			.then((res) => res.json())
			.then((data) => {
				if (data.msg !== 'ok') {
					console.error('Error pinning note:', data.msg);
				}
			})
			.catch(console.error);
	}

	let search = $state('');
</script>

<form bind:this={saveForm} action="?/save" method="POST" hidden>
	<input bind:this={titleInput} type="text" name="title" />
	<textarea bind:this={contentInput} name="content"></textarea>
	<input bind:this={encryptedInput} type="text" name="encrypted" />
	<input bind:this={noteIdInput} type="text" name="id" />
</form>

<svelte:window bind:innerWidth />

<Navbar pageData={data} />

{#if pinInputOpen}
	<PinInput
		close={() => (pinInputOpen = false)}
		submit={openWithPin}
		type="load"
		{incorrectPin}
		deleteNote={deleteNoteFromPinInput}
	/>
{/if}

{#if editorOpen}
	<NoteEditor
		close={closeEditor}
		{save}
		closeButton={editorCloseButton}
		defaultTitle={noteTitle}
		defaultContent={noteContent}
		{deleteNote}
		noteId={currentNoteId}
		{pinNote}
		pinned={notePinned}
	/>
{/if}

<div class="md:mx-auto md:w-4/5">
	<Searchbar
		createButtonClick={() => {
			noteTitle = '';
			noteContent = '';
			currentNoteId = '';
			openEditor();
		}}
		{editorOpen}
		searchUpdated={(val: string) => (search = val)}
	/>

	{#if !search && data.notes.length > 0}
		{#if pinnedNotes.length > 0}
			<SectionTitle title="Pinned" icon="keep" />
			<div
				class="mx-4 mb-8 flex gap-4 overflow-x-scroll rounded-lg bg-background-50 p-4 transition-colors"
			>
				{#each pinnedNotes as note}
					<Pinned {note} click={getPinAndOpen} />
				{/each}
			</div>
		{/if}

		<SectionTitle title="Recent" icon="history" />
		<div
			class="mx-4 mb-8 flex gap-4 overflow-x-scroll rounded-lg bg-background-50 p-4 transition-colors"
		>
			{#each data.notes.slice(0, 10) as note}
				<Recent {note} click={getPinAndOpen} />
			{/each}
		</div>
	{/if}

	<SectionTitle
		title={search.length > 0 ? 'Search results' : 'All notes'}
		icon={search.length > 0 ? 'search' : 'notes'}
	/>
	<div class="mx-auto mb-8 flex flex-wrap gap-4 px-4">
		{#each data.notes.filter((note) => note.title
				.toLowerCase()
				.includes(search.toLowerCase())) as note}
			<NoteCard {note} click={getPinAndOpen} />
		{/each}

		{#if !search && data.notes.length === 0}
			<p class="text-text-800">
				You haven't created any notes yet. Write your first note by clicking the + button!
			</p>
		{/if}

		{#if search && data.notes.filter((note) => note.title
					.toLowerCase()
					.includes(search.toLowerCase())).length === 0}
			<p class="text-text-800">
				No notes found with "{search}" in the title.
			</p>
		{/if}
	</div>
</div>
