<script>
	import { credential } from '../../stores/auth';

	export let hash;

	let code = '';

	async function submitCode() {
		await credential.loginCode(hash, code);
		mfaCode = true;
	}
</script>

<form on:submit={submitCode}>
	<label for="login-code">Code</label>
	<input id="login-code" bind:value={code} placeholder="123456" />
	<input type="submit" value="Login" />
</form>

<style lang="scss">
	form {
		background-color: cornflowerblue;
		padding: 2vw;
		border-radius: 1vw;
		color: white;
	}
</style>
