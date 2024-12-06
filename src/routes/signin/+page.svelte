<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	let password: string;
	let email: string;

	import { page } from '$app/stores';
</script>

<input type="text" placeholder="mail" bind:value={email} />
<input type="text" placeholder="heslo" bind:value={password} />
<button onclick={() => signIn('credentials', { email, password })}>sign in</button>
<button onclick={() => signOut()}>sign out</button>
<button
	onclick={() => {
		console.log($page.data.session);
	}}>check</button
>
