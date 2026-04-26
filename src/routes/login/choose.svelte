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

  async function submitChoose(event: SubmitEvent) {
    event.preventDefault()
    const mfaCodeHash = await credential.chooseStrategy(hash, strategyOption as Strategy)
    setMfaCodeHash(mfaCodeHash)
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-stone-50 p-4 font-serif">
  <div class="w-full max-w-md border border-stone-300 bg-white p-10 shadow-2xl">
    <form onsubmit={submitChoose} class="flex flex-col gap-8">
      <div class="text-center">
        <h2 class="text-2xl uppercase tracking-tight text-stone-900">Security Verification</h2>
        <p class="mt-2 italic text-stone-600">Select your preferred method</p>
      </div>

      <div class="bg-stone-100 p-6">
        <label
          for="login-strategy"
          class="mb-3 block text-xs uppercase tracking-widest text-stone-500"
          >Authentication Method</label>
        <select
          id="login-strategy"
          bind:value={strategyOption}
          class="w-full appearance-none border-b border-stone-400 bg-transparent py-2 text-stone-900 focus:border-stone-900 focus:outline-none">
          <option value={null}>- Select Method -</option>
          {#each list as opt (opt)}
            <option value={opt}>{opt}</option>
          {/each}
        </select>
      </div>

      <button
        type="submit"
        disabled={!strategyOption}
        class="w-full bg-stone-900 py-4 font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-800 disabled:bg-stone-300">
        Continue
      </button>
    </form>
  </div>
</div>
