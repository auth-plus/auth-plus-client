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
	<button on:click={logout} disabled={cred === null}>Logout</button>
</nav>

<style lang="scss">
	.isDisabled {
		color: currentColor;
		cursor: not-allowed;
		opacity: 0.5;
		text-decoration: none;
	}
</style>
