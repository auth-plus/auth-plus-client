<script lang="ts">
	import { credential } from '../../stores/auth'
	import type { Strategy } from '../mfa/mfa'

	type Props = {
		list: Strategy[]
		hash: string
		setMfaCodeHash: (value: string) => void
	}

	let { list, hash, setMfaCodeHash }: Props = $props()

	let strategyOption = $state<string | null>(null)

	async function submitChoose() {
		const mfaCodeHash = await credential.chooseStrategy(hash, strategyOption as Strategy)
		setMfaCodeHash(mfaCodeHash)
	}
</script>

<form onsubmit={submitChoose}>
	<label for="login-strategy">Select a Multi-Factor Authentication (MFA) method</label>
	<select name="cars" id="login-strategy" bind:value={strategyOption}>
		<option value={null}>-</option>
		{#each list as opt (opt)}
			<option value={opt}>{opt}</option>
		{/each}
	</select>
	<input type="submit" value="Choose" />
</form>

<style lang="scss">
	form {
		width: 30%;
		margin-left: auto;
		margin-right: auto;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.3);
		padding: 2vw;
		border-radius: 1vw;
		color: white;
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		gap: 1vmin;
		input,
		select {
			margin: 0.5vw 0;
			display: block;
			padding: 1vmin;
			border-radius: 3px;
			border: none;
			width: 100%;
			box-sizing: border-box;
			background-color: rgba(255, 255, 255, 1);
			cursor: pointer;
		}
	}
</style>
