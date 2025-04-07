<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import Navbar from '$lib/components/navbar.svelte';

	let passwordError = $state(false);
	let emailError = $state(false);
	let errorMessage = $state('');

	function toggleError(type: string, message: string) {
		errorMessage = message;

		switch (type) {
			case 'email':
				emailError = true;
				setTimeout(() => {
					emailError = false;
					errorMessage = '';
				}, 3000);
				break;
			case 'password':
				passwordError = true;
				setTimeout(() => {
					passwordError = false;
					errorMessage = '';
				}, 3000);
				break;
			default:
				emailError = true;
				passwordError = true;
				setTimeout(() => {
					emailError = false;
					passwordError = false;
					errorMessage = '';
				}, 3000);
				break;
		}
	}

	function handleResponse(r: any) {
		if (r.data?.msg) {
			switch (r.data.msg) {
				case 'ok':
					goto('/home');
					break;
				case 'userAlreadyExists':
					toggleError('email', 'User with this already exists!');
					break;
				case 'passwordMismatch':
					toggleError('password', "Passwords don't match!");
					break;
				default:
					console.log(r);
					toggleError('unknown', 'Unknown error');
					break;
			}
		} else {
			console.log(r);
			toggleError('unknown', 'Unknown error');
		}
	}
</script>

<Navbar menuButton={false} />

<div
	class="fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen items-center justify-center p-4"
>
	<form
		class="flex w-full flex-col items-center rounded-lg bg-background-50 p-4 py-8 md:w-1/3"
		method="post"
		use:enhance={() => {
			passwordError = false;
			emailError = false;

			return async ({ result }) => {
				handleResponse(result);
			};
		}}
	>
		<h1 class="mb-4 text-xl font-semibold text-text-800">Create your NoteCrypt account!</h1>
		<div class="flex w-full max-w-96 flex-col">
			<label for="username" class="ml-2 text-primary">Username</label>
			<input required name="username" class="rounded-lg border border-primary bg-background p-2" />

			<label for="email" class="ml-2 mt-4 text-primary">Email</label>
			<input
				required
				type="email"
				name="email"
				class="rounded-lg border border-primary bg-background p-2 transition-colors"
			/>

			{#if emailError}
				<p class="mr-2 mt-1 text-right text-sm text-accent">{errorMessage}</p>
			{/if}

			<label for="password" class="ml-2 mt-4 text-primary">Password</label>
			<input
				required
				type="password"
				name="password"
				class=" rounded-t-lg border border-b border-primary border-b-primary bg-background p-2 transition-colors"
			/>
			<input
				required
				placeholder="Confirm password"
				type="password"
				name="confirmPassword"
				class="rounded-b-lg border-x border-b border-primary bg-background p-2 placeholder:text-background-200"
			/>

			{#if passwordError}
				<p class="mr-2 mt-1 text-right text-sm text-accent">{errorMessage}</p>
			{/if}
		</div>

		<Button additionalStyle="my-8 w-full max-w-64" colorScheme="text800">
			<span class="material-symbols-outlined">person_add</span>
			<h3 class="font-semibold">Sign Up</h3>
		</Button>
		<p class="text-sm text-background-400">
			Already have an account?
			<a href="/auth/signin" class="ml-2 text-background-600">Sign in!</a>
		</p>
	</form>
</div>
