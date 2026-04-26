<script lang="ts">
  import { credential, type MFAChoose } from '../../stores/auth'
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'

  type Props = {
    setMfaChoose: (value: MFAChoose) => void
  }
  let { setMfaChoose }: Props = $props()

  let email = $state('')
  let password = $state('')
  let loginError = $state('')

  async function submit(event: SubmitEvent) {
    event.preventDefault()
    try {
      const mfaCh = await credential.login(email, password)
      if (mfaCh != null) {
        setMfaChoose(mfaCh)
      } else {
        if (!$credential) {
          throw new Error('credential should be setted')
        }
        sessionStorage.setItem('token', $credential.token)
        goto(resolve('/'))
      }
    } catch (error) {
      loginError = (error as Error).message
    }
  }
</script>

<div
  class="flex flex-col items-center justify-center bg-stone-50 p-4 py-8 font-serif text-stone-900">
  <form
    onsubmit={submit}
    class="flex w-full max-w-md flex-col gap-6 border border-stone-300 bg-white p-10 shadow-2xl">
    <div class="text-center">
      <h1 class="text-3xl uppercase tracking-tight text-stone-900">Welcome Back</h1>
      <p class="mt-2 italic text-stone-600">Please enter your credentials</p>
    </div>
    <div class="space-y-4">
      <div>
        <label for="login-email" class="mb-1 block text-sm uppercase tracking-widest text-stone-500"
          >Email</label>
        <input
          id="login-email"
          bind:value={email}
          type="email"
          placeholder="name@company.com"
          class="w-full border-b border-stone-300 bg-transparent py-2 transition-colors focus:border-stone-900 focus:outline-none" />
      </div>

      <div>
        <label for="login-pw" class="mb-1 block text-sm uppercase tracking-widest text-stone-500"
          >Password</label>
        <input
          id="login-pw"
          type="password"
          bind:value={password}
          placeholder="••••••••"
          class="w-full border-b border-stone-300 bg-transparent py-2 transition-colors focus:border-stone-900 focus:outline-none" />
      </div>
    </div>

    <button
      type="submit"
      class="group relative mt-2 flex w-full items-center justify-center gap-3 bg-stone-900 px-6 py-4 font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-800 active:scale-[0.98]">
      <span>Sign In</span>
      <svg
        class="h-4 w-4 transition-transform group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>

    {#if loginError !== ''}
      <div class="border border-red-200 bg-red-50 p-3 text-center text-sm italic text-red-800">
        {loginError}
      </div>
    {/if}
  </form>
</div>
