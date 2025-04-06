<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './button.svelte';

	let digits: string[] = $state(['', '', '', '', '', '']);
	let inputs: HTMLInputElement[] = $state([]);

	let {
		close,
		submit,
		type,
		incorrectPin = false,
    deleteNote = () => {},
	}: {
		close: Function;
		submit: Function;
		type: 'save' | 'load';
		incorrectPin?: boolean;
    deleteNote?: Function;
	} = $props();

	function handleInput(index: number, event: Event) {
		const value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(-1);
		if (value) {
			digits[index] = value;
			if (index < 5) {
				inputs[index + 1]?.focus();
			}
		} else {
			digits[index] = '';
		}
	}

	function handleKeydown(index: number, event: KeyboardEvent) {
		if (event.key === 'Backspace') {
			if (digits[index]) {
				digits[index] = '';
			} else if (index > 0) {
				inputs[index - 1]?.focus();
				digits[index - 1] = '';
			}
		}
	}

	onMount(() => {
		inputs[0]?.focus();
	});
</script>

<div class="fixed bottom-0 left-0 right-0 top-0 bg-background opacity-80"></div>

<div class="fixed bottom-0 left-4 right-4 top-0 flex items-center justify-center">
	<div
		class="flex w-full flex-col items-center justify-center rounded-lg bg-background-50 p-4 md:w-2/3 lg:w-1/3"
	>
		<h2 class="text-2xl font-semibold text-text-800">Enter PIN</h2>
		{#if type === 'save'}
			<h3 class="text-text-800">or save this note unencrypted</h3>
		{/if}

		{#if incorrectPin}
			<p class="mt-4 text-sm text-accent">Incorrect PIN! Please try again.</p>
		{/if}

		<div class="my-4 flex items-center justify-center gap-1">
			{#each digits as _, i}
				<input
					type="text"
					bind:this={inputs[i]}
					bind:value={digits[i]}
					oninput={(e) => handleInput(i, e)}
					onkeydown={(e) => handleKeydown(i, e)}
					inputmode="numeric"
					maxlength="1"
					class="h-12 w-12 rounded-lg border-2 border-background-100 bg-background text-center font-semibold text-text-800 outline-primary"
				/>
			{/each}
		</div>

		<div class="mb-8 flex w-full gap-2">
			{#if incorrectPin && digits.join('').length !== 6}
				<Button colorScheme="accent" click={deleteNote}>
					<span class="material-symbols-outlined">delete</span>
				</Button>
			{/if}

			<Button
				additionalStyle={digits.join('').length !== 6 && type === 'load' ? 'grow' : 'w-1/2'}
				preset="skeleton"
				colorScheme="accent"
				click={close}
			>
				<h3 class="font-semibold">Cancel</h3>
			</Button>
			{#if type === 'save'}
				{#if digits.join('').length === 6}
					<Button additionalStyle="w-1/2" click={() => submit(digits.join(''))}>
						<span class="material-symbols-outlined">encrypted</span>
						<h3 class="font-semibold">Save</h3>
					</Button>
				{:else}
					<Button additionalStyle="w-1/2" colorScheme="secondary" click={() => submit(null)}>
						<span class="material-symbols-outlined">encrypted_off</span>
						<h3 class="font-semibold">Save</h3>
					</Button>
				{/if}
			{:else if digits.join('').length === 6}
				<Button additionalStyle="w-1/2" click={() => submit(digits.join(''))}>
					<span class="material-symbols-outlined">lock_open</span>
					<h3 class="font-semibold">Unlock</h3>
				</Button>
			{/if}
		</div>

		{#if type === 'save'}
			<p class="text-sm text-accent">
				Disclaimer: If you forget your PIN, your note's content will be irrecoverably lost!
			</p>
		{/if}
	</div>
</div>
