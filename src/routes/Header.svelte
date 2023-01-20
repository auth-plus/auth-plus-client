<script>
	import { credential } from '../stores/auth';

	import Login from './login/+page.svelte';

	let cred;

	async function logout() {
		await credential.logout(cred.token);
		sessionStorage.removeItem('token');
	}

	credential.subscribe((value) => {
		cred = value;
	});
</script>

<h1>Auth Plus Client</h1>
<nav>
	<a href="/">Home</a>
	<a href="/invoices" class:isDisabled={cred === null}>invoices</a>
	<a href="/mfa" class:isDisabled={cred === null}>mfa</a>
	<button on:click={logout} disabled={cred === null}>Logout</button>
</nav>

<style lang="scss">
	.isDisabled {
		display: none;
	}
</style>
