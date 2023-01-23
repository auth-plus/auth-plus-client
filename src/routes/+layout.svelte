<script>
	import Header from './Header.svelte';

	import { onMount } from 'svelte';
	import { credential } from '../stores/auth';
	import Login from './login/+page.svelte';

	let user = null;
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
		user = value;
	});
</script>

<Header />

<main>
	{#if $credential === null}
		<Login />
	{:else}
		<slot />
	{/if}
</main>

<style>
	main {
		width: 100%;
		padding: 5vw;
		box-sizing: border-box;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
</style>
