<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button.svelte';
</script>

<div class="flex h-screen w-screen items-center justify-center p-4">
	<form
		class="flex w-full flex-col items-center rounded-lg bg-background-50 p-4 py-8 md:w-1/3"
		method="post"
		use:enhance
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
				class="rounded-lg border border-primary bg-background p-2"
			/>

			<label for="password" class="ml-2 mt-4 text-primary">Password</label>
			<input
				required
				type="password"
				name="password"
				class="mb-2 rounded-lg border border-primary bg-background p-2"
			/>
			<input
				required
        placeholder="Confirm password"
				type="password"
				name="password"
				class="placeholder:text-background-200 rounded-lg border border-primary bg-background p-2"
			/>
		</div>
		<Button additionalStyle="my-8 w-full max-w-64" colorScheme="text800">
			<span class="material-symbols-outlined">login</span>
			<h3 class="font-semibold">Sign Up</h3>
		</Button>
		<p class="text-sm text-background-400">
			Don't have an account yet?
			<a href="/auth/signup" class="ml-2 text-background-600"> Sign up!</a>
		</p>
	</form>
</div>
