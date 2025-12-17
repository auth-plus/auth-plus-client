<script lang="ts">
	import { onMount } from 'svelte'

	import { listMfa, Strategy } from './mfa'
	import { credential } from '../../stores/auth'
	import Card from './strategy.svelte'
	import Modal from './modal.svelte'

	const allStrategies = [Strategy.EMAIL, Strategy.PHONE, Strategy.GA]

	let mfaList = $state<Strategy[] | null>(null)

	let strategyChoosed = $state<Strategy | null>(null)
	let secret = $state('')

	onMount(async () => {
		if ($credential === null) {
			throw new Error('Credential shoudl be setted by now')
		}
		mfaList = await listMfa($credential.id, $credential.token)
	})

	function setAction(strategy: Strategy, mfaId: string) {
		if ($credential === null) {
			throw new Error('Credential shoudl be setted by now')
		}
		if (strategy === Strategy.GA) {
			secret = mfaId
		}
		strategyChoosed = strategy
	}
</script>

<section class="description">
	<h2>Choose a verification method. It's a good security practice.</h2>
	<p>
		Select a new security factor for your account. Available options include email verification, SMS
		codes, and time-based one-time passwords (TOTP).
	</p>
</section>

{#if mfaList != null}
	<section class="method_list">
		{#each allStrategies as strategy (strategy)}
			<Card {strategy} alreadySetup={mfaList.includes(strategy)} {setAction} />
		{/each}
	</section>
{:else}
	<p>...waiting</p>
{/if}

{#if strategyChoosed != null && $credential}
	<Modal {secret} {strategyChoosed} email={$credential.email} />
{/if}

<style lang="scss">
	section.description {
		padding: 5vmin;
		max-width: 60%;
	}
	section.method_list {
		background-color: rgb(228, 228, 228);
		padding: 5vmin;
		display: flex;
		gap: 10vmin;
		justify-content: space-evenly;
	}
</style>
