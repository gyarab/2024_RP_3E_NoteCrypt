<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form
	method="post"
	use:enhance={() => {
		return async ({ result }) => {
			console.log(result);
			const r = result as any;
			if (r.data?.reason && r.data.reason == 'nonexistent') {
				alert('nonexistent');
			}
		};
	}}
>
	<label for="email">Email</label>
	<input name="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" /><br />
	<button>sign in</button>
</form>
