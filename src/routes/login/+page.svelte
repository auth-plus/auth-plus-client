<script>
	import { credential } from '../../stores/auth';

	let email = '';
	let password = '';
	let strategyOption = null;
	let code = '';
	let mfaChoose = null;
	let mfaCodeHash = null;
	async function submit() {
		const mfaCh = await credential.login('admin@authplus.com', '7061651770d7b3ad8fa96e7a8bc61447');
		if (mfaCh != null) {
			mfaChoose = mfaCh;
		}
	}

	async function submitChoose() {
		mfaCodeHash = await credential.chooseStrategy(mfaChoose.hash, strategyOption);
	}

	async function submitCode() {
		await credential.loginCode(mfaCodeHash, code);
		mfaCode = true;
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

{#if mfaChoose != null}
	<form on:submit={submitChoose}>
		<label for="login-strategy">Choose One</label>
		<select name="cars" id="login-strategy" bind:value={strategyOption}>
			<option value={null}>-</option>
			{#each mfaChoose.strategyList as strate}
				<option value={strate}>{strate}</option>
			{/each}
		</select>
		<input type="submit" value="Choose" />
	</form>
{/if}

{#if mfaCodeHash !== null}
	<form on:submit={submitCode}>
		<label for="login-code">Code</label>
		<input id="login-code" bind:value={code} placeholder="123456" />
		<input type="submit" value="Login" />
	</form>
{/if}
