<script lang="ts">
  import { credential, type User } from '../../../stores/auth'
  import { verifyMfa, Strategy } from '../mfa'

  let user = $state<User | null>(null)

  credential.subscribe((value: User | null) => {
    user = value
  })

  async function verifyNewStrategy() {
    if ($credential === null) {
      throw new Error('Credential shoudl be setted by now')
    }
    await verifyMfa($credential.id, Strategy.PHONE, $credential.token)
  }
</script>

<button
  type="button"
  class="group flex w-full items-start gap-6 border border-transparent p-4 text-left transition-all duration-300 hover:border-stone-200 hover:bg-white"
  onclick={verifyNewStrategy}>
  <div
    class="mt-1 bg-stone-900 p-3 shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:bg-stone-700">
    <svg
      class="h-6 w-6 text-stone-900 grayscale transition-all duration-700 group-hover:grayscale-0"
      fill="none"
      stroke="white"
      viewBox="0 0 24 24"
      stroke-width="1.5">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  </div>

  <div class="flex flex-col">
    <span class="mb-1 text-sm font-black uppercase tracking-widest text-stone-900">
      Mobile Verification
    </span>
    <p
      class="text-xs italic leading-relaxed text-stone-500 transition-colors group-hover:text-stone-700">
      {#if user?.info?.phone}
        Dispatch to <span class="font-mono font-bold not-italic text-stone-900"
          >{user?.info?.phone}</span>
      {:else}
        No contact registry identified.
      {/if}
    </p>
  </div>
</button>
