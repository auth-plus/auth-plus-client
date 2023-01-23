<script lang="ts">
  import { onMount } from 'svelte'

  import { listMfa, Strategy } from './mfa'
  import { credential } from '../../stores/auth'
  import Card from './strategy.svelte'
  import Modal from './modal.svelte'

  const allStrategies = [Strategy.EMAIL, Strategy.PHONE, Strategy.GA]

  let mfaList: Strategy[] | null = null

  let strategyChoosed: Strategy | null = null
  let secret = ''

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

<h2>Multi Factor Authentication</h2>

{#if mfaList != null}
  {#each allStrategies as strategy}
    <Card {strategy} isEnable={mfaList.includes(strategy)} {setAction} />
  {/each}
{:else}
  <p>...waiting</p>
{/if}

{#if strategyChoosed != null && $credential}
  <Modal {secret} {strategyChoosed} email={$credential.email} />
{/if}
