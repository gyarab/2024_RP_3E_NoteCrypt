<script>
	import { enhance } from '$app/forms';
</script>

<form method="post" use:enhance>
	<label for="email">Email</label>
	<input name="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" /><br />
	<button>sign in</button>
</form>
