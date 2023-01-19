<script>
	import { onMount } from 'svelte';
	import { credential } from '../stores/auth';

	import Login from './login/+page.svelte';

	let cred;
	onMount(async () => {
		const token = sessionStorage.getItem('token');
		if (token) {
			try {
				const newToken = await credential.refresh(token);
				sessionStorage.setItem('token', newToken);
			} catch (error) {
				console.error(error);
				sessionStorage.removeItem('token');
				credential.logout(token);
			}
		}
	});
	credential.subscribe((value) => {
		cred = value;
	});
</script>

{#if cred === null}
	<Login />
{:else}
	<h1>HOME</h1>
{/if}
