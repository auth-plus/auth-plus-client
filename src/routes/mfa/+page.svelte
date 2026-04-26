<script lang="ts">
  import { onMount } from 'svelte'

  import { listMfa, Strategy } from './mfa'
  import { credential } from '../../stores/auth'
  import Card from './strategy.svelte'
  import Modal from './modal.svelte'

  const allStrategies = [Strategy.EMAIL, Strategy.PHONE, Strategy.GA]

  let mfaList = $state<Strategy[] | null>(null)

  let strategyChoosed = $state<Strategy | null>(null)

  onMount(async () => {
    if ($credential === null) {
      throw new Error('Credential shoudl be setted by now')
    }
    mfaList = await listMfa($credential.id, $credential.token)
  })

  function setChoose(strategy: Strategy) {
    strategyChoosed = strategy
  }
  function closeModal() {
    strategyChoosed = null
  }
</script>

<header class="border-b border-stone-300 bg-stone-50 px-8 py-20 text-center">
  <h2 class="mb-4 font-serif text-5xl uppercase tracking-tight text-stone-900">
    Choose a verification method.
  </h2>
  <p class="mx-auto max-w-2xl text-lg italic text-stone-600">
    Select a new security factor for your account. Options include email, SMS, and TOTP.
  </p>
</header>

{#if mfaList != null}
  <section class="bg-stone-200 px-8 py-24">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
      {#each allStrategies as strategy (strategy)}
        <Card {strategy} alreadySetup={mfaList.includes(strategy)} {setChoose} />
      {/each}
    </div>
  </section>
  {#if strategyChoosed != null && $credential}
    <Modal {strategyChoosed} alreadySetup={mfaList.includes(strategyChoosed)} {closeModal} />
  {/if}
{:else}
  <div class="bg-stone-200 py-24 text-center font-serif italic text-stone-500">
    <p>...waiting</p>
  </div>
{/if}
