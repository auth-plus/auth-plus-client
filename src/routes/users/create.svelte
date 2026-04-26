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

<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 p-4 backdrop-blur-sm">
  <div class="w-full max-w-md border-t-4 border-stone-900 bg-stone-50 p-8 shadow-2xl">
    <h2 class="mb-6 text-2xl uppercase tracking-widest text-stone-900">New Identity</h2>

    <form onsubmit={createNew} class="space-y-6">
      <div>
        <label
          for="create-user-name"
          class="mb-1 block text-xs uppercase tracking-tighter text-stone-500">Full Name</label>
        <input
          id="create-user-name"
          bind:value={name}
          type="text"
          placeholder="e.g. Jane Doe"
          class="w-full border-b border-stone-300 bg-transparent py-2 outline-none transition-colors focus:border-stone-900" />
      </div>

      <div>
        <label
          for="create-user-email"
          class="mb-1 block text-xs uppercase tracking-tighter text-stone-500">Email Address</label>
        <input
          id="create-user-email"
          bind:value={email}
          type="email"
          placeholder="jane@example.com"
          class="w-full border-b border-stone-300 bg-transparent py-2 outline-none transition-colors focus:border-stone-900" />
      </div>

      <div>
        <label
          for="create-user-pw"
          class="mb-1 block text-xs uppercase tracking-tighter text-stone-500"
          >Secure Password</label>
        <input
          id="create-user-pw"
          bind:value={password}
          type="password"
          placeholder="••••••••"
          class="w-full border-b border-stone-300 bg-transparent py-2 outline-none transition-colors focus:border-stone-900" />
      </div>

      <div class="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onclick={toogleModal}
          class="px-6 py-2 text-sm uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900">
          Cancel
        </button>
        <button
          type="submit"
          class="bg-stone-900 px-8 py-2 text-sm uppercase tracking-widest text-white transition-colors hover:bg-stone-700">
          Create
        </button>
      </div>
    </form>
  </div>
</div>
