<script>
	import { onMount } from 'svelte';
	import { listMfa, Strategy,createMfa } from './mfa';
	import { credential } from '../../stores/auth';

	let mfaList = null;
	let strategyOption = null;
	onMount(async () => {
		console.log($credential);
		mfaList = await listMfa($credential.id, $credential.token);
	});

	async function createNewStrategy() {
		await createMfa($credential.id,strategyOption, $credential.token);
	}
</script>

<h1>Multi factor Authentication</h1>

<h3>Your mfa</h3>

{#if mfaList != null}
	{#if mfaList.length > 0}
		{#each mfaList as strate}
			<li>
				{strate}
			</li>
		{/each}
	{:else}
		<p>You have 0 mfa</p>
	{/if}
{:else}
	<p>...waiting</p>
{/if}

<form on:submit={createNewStrategy}>
	<select name="cars" id="login-strategy" bind:value={strategyOption}>
		<option value={null}>-</option>
		{#each [Strategy.EMAIL, Strategy.PHONE, Strategy.GA] as strate}
			<option value={strate}>{strate}</option>
		{/each}
	</select>
	<input type="submit" value="Create" />
</form>
