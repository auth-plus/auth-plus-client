<script>
	import { credential } from '../../stores/auth';

	export let list;
	export let hash;
	export let setMfaCodeHash;

	let strategyOption = null;

	async function submitChoose() {
		const mfaCodeHash = await credential.chooseStrategy(hash, strategyOption);
		setMfaCodeHash(mfaCodeHash);
	}
</script>

<form on:submit={submitChoose}>
	<label for="login-strategy">Choose One</label>
	<select name="cars" id="login-strategy" bind:value={strategyOption}>
		<option value={null}>-</option>
		{#each list as opt}
			<option value={opt}>{opt}</option>
		{/each}
	</select>
	<input type="submit" value="Choose" />
</form>

<style lang="scss">
	form {
		background-color: cornflowerblue;
		padding: 2vw;
		border-radius: 1vw;
		color: white;
	}
</style>
