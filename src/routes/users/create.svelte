<script lang="ts">
	import { createNewUser } from './users'
	import { credential } from '../../stores/auth'

	type Props = {
		toogleModal: () => void
	}
	let { toogleModal }: Props = $props()
	let name = $state('')
	let email = $state('')
	let password = $state('')
	async function createNew() {
		if (!$credential) {
			throw new Error('credential should be setted')
		}
		await createNewUser(name, email, password, $credential.token)
		toogleModal()
	}
</script>

<div class="modal">
	<form onsubmit={createNew}>
		<label for="create-user-name">Name</label>
		<input type="text" id="create-user-name" bind:value={name} placeholder="enter username" />
		<label for="create-user-email">Email</label>
		<input type="email" id="create-user-email" bind:value={email} placeholder="enter user email" />
		<label for="create-user-pw">Password</label>
		<input
			type="password"
			id="create-user-pw"
			bind:value={password}
			placeholder="enter user password"
		/>
		<div class="button-row">
			<button class="negative" onclick={toogleModal}>Close</button>
			<button class="positive" type="submit"> Create </button>
		</div>
	</form>
</div>

<style lang="scss">
	div.modal {
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 100;
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		overflow: auto;
	}
	form {
		position: relative;
		z-index: 200;
		width: 30%;
		margin: 10% auto;
		box-sizing: border-box;
		background-color: transparent;
		padding: 2vw;
		border-radius: 1vw;
		color: rgb(255, 255, 255);
		label {
			display: block;
		}
		input {
			margin: 0.5vw 0 2vmin 0;
			display: block;
			padding: 1vmin;
			border-radius: 3px;
			border: none;
			width: 100%;
			box-sizing: border-box;
		}
		div.button-row {
			display: flex;
			justify-content: space-between;
			button {
				background-color: white;
				border: none;
				border-radius: 5px;
				cursor: pointer;
				padding: 0.5vw;
				&.positive {
					color: rgb(22, 143, 103);
				}
				&.negative {
					color: rgb(143, 22, 22);
				}
			}
		}
	}
</style>
