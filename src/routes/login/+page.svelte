<script>
	import { credential } from '../../stores/auth';

	let email = '';
	let password = '';
	async function submit() {
		const token = await credential.login('admin@authplus.com', '7061651770d7b3ad8fa96e7a8bc61447');
		sessionStorage.setItem('token', token);
	}
</script>

<form on:submit={submit}>
	<label for="login-email">Email</label>
	<input id="login-email" bind:value={email} placeholder="enter your email" />
	<label for="login-pw">Password</label>
	<input id="login-pw" bind:value={password} placeholder="enter your password" />
	<input type="submit" value="Login" />
</form>
<a href="/forget">Esqueci a senha</a>
