<script>
	import { enhance } from '$app/forms';
</script>

<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" /><br />
	<label for="email">Email</label>
	<input name="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" /><br />
	<button>signup</button>
</form>
