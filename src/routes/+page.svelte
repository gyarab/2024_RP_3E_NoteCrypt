<script lang="ts">
	import { enhance } from '$app/forms';
	import Navbar from '$lib/components/navbar.svelte';
	import { saltAndHashPassword } from '$lib/saltAndHashPassword';

	let password: string;
	let pwHashInput: HTMLInputElement;

	async function signUp() {
		await Promise.resolve(saltAndHashPassword(password)).then((hash) => {
			pwHashInput.value = hash;

			const form = document.getElementById('signUpForm') as HTMLFormElement | null;
			if (form) form.requestSubmit();
		});
	}
</script>

<Navbar />

<form
	method="POST"
	action="?/signUp"
	id="signUpForm"
	use:enhance={() => {
		return async ({ result, update }) => {
			console.log(result);
		};
	}}
>
	<input type="text" placeholder="Name" name="name" />
	<input type="email" name="email" placeholder="Email" />
	<input type="hidden" name="pwHash" bind:this={pwHashInput} />
</form>
<input type="password" placeholder="Password" bind:value={password} />

<button onclick={signUp}>sign up</button>
