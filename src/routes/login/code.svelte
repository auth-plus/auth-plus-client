<script lang="ts">
  import { credential } from '../../stores/auth'

  type Props = {
    hash: string
  }

  let { hash }: Props = $props()
  let code = $state('')

  async function submitCode(event: SubmitEvent) {
    event.preventDefault()
    await credential.loginCode(hash, code)
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-stone-50 p-4 font-serif">
  <div class="w-full max-w-md border border-stone-300 bg-white p-10 shadow-2xl">
    <form onsubmit={submitCode} class="flex flex-col gap-8">
      <div class="text-center">
        <h2 class="text-2xl tracking-tight text-stone-900 uppercase">Enter Code</h2>
        <p class="mt-2 text-stone-600 italic">Verification sent to your device</p>
      </div>

      <div class="flex flex-col items-center">
        <label for="login-code" class="mb-4 text-xs tracking-widest text-stone-500 uppercase"
          >Verification Code</label>
        <input
          id="login-code"
          bind:value={code}
          placeholder="000000"
          maxlength="6"
          class="w-full border-b-2 border-stone-900 bg-transparent text-center text-5xl font-light tracking-[0.5em] text-stone-900 placeholder-stone-200 focus:outline-none" />
      </div>

      <div class="space-y-4">
        <button
          type="submit"
          class="w-full bg-stone-900 py-4 font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-stone-800">
          Verify & Sign In
        </button>

        <button
          type="button"
          class="w-full text-sm tracking-widest text-stone-400 uppercase transition-colors hover:text-stone-900">
          Resend Code
        </button>
      </div>
    </form>
  </div>
</div>
