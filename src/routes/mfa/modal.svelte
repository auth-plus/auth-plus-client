<script lang="ts">
  import { credential } from '../../stores/auth'
  import { createMfa, Strategy } from './mfa'
  import TotpModal from './_modals/totp.svelte'
  import PhoneModal from './_modals/phone.svelte'
  import EmailModal from './_modals/email.svelte'

  type Props = {
    strategyChoosed: Strategy | null
    alreadySetup: boolean
    closeModal: () => void
  }

  let { strategyChoosed, alreadySetup, closeModal }: Props = $props()
  let code = $state('')
  let secret = $state<string | null>(null)

  async function setSecret(scrt: string) {
    secret = scrt
  }

  async function createNewStrategy(event: SubmitEvent) {
    event.preventDefault()
    if ($credential === null) {
      throw new Error('Credential shoudl be setted by now')
    }
    if (strategyChoosed === null) {
      throw new Error('Mfa should be choosed by now')
    }
    await createMfa($credential.id, strategyChoosed, $credential.token, code, secret)
  }
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 p-4 backdrop-blur-md">
  <div
    class="relative w-full max-w-md border border-stone-400 bg-stone-50 p-8 shadow-[20px_20px_0px_0px_rgba(28,25,23,1)] md:p-10">
    <header class="mb-10 border-b-2 border-stone-200 pb-6">
      <h2 class="font-serif text-4xl uppercase leading-none tracking-tighter text-stone-900">
        Verification
      </h2>
      <p class="mt-3 text-xs font-medium uppercase italic tracking-widest text-stone-500">
        Security Protocol Activation
      </p>
    </header>

    <main class="mb-8">
      {#if strategyChoosed === Strategy.GA}
        <TotpModal {setSecret} />
      {:else if strategyChoosed == Strategy.EMAIL}
        <EmailModal />
      {:else if strategyChoosed == Strategy.PHONE}
        <PhoneModal />
      {/if}
    </main>

    {#if !alreadySetup}
      <form onsubmit={createNewStrategy} class="space-y-8">
        <div class="group relative">
          <label
            for="login-code"
            class="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400"
            >Enter Signature</label>
          <input
            id="login-code"
            type="text"
            bind:value={code}
            placeholder="000000"
            maxlength="6"
            inputmode="numeric"
            pattern="[0-9]*"
            class="w-full border-2 border-stone-200 bg-stone-100 py-6 text-center font-mono text-3xl tracking-[0.6em] text-stone-900 placeholder-stone-300 transition-all focus:border-stone-900 focus:bg-white focus:outline-none" />
        </div>

        <button
          type="submit"
          disabled={code.length !== 6}
          class="w-full transform bg-stone-900 px-6 py-5 font-black uppercase tracking-[0.2em] text-stone-50 transition-all hover:bg-stone-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400">
          Confirm Activation
        </button>
      </form>
    {/if}

    <footer class="mt-10 border-t border-stone-200 pt-6">
      <button
        type="button"
        onclick={closeModal}
        class="mx-auto block text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 transition-colors hover:text-stone-900">
        [ Close ]
      </button>
    </footer>
  </div>
</div>
