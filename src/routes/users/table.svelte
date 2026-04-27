<script lang="ts">
  import { onMount } from 'svelte'
  import { credential } from '../../stores/auth'
  import { listUser } from './users'

  let list = $state<{ id: string; name: string; email: string }[]>([])

  onMount(async () => {
    if (!$credential) {
      throw new Error('credential should be setted')
    }
    list = await listUser($credential.token)
  })
</script>

<div class="overflow-hidden border border-stone-300 bg-white shadow-sm">
  <table class="w-full border-collapse text-left">
    <thead>
      <tr class="border-b border-stone-300 bg-stone-100">
        <th class="px-6 py-4 text-sm font-bold uppercase tracking-widest text-stone-900">Id</th>
        <th class="px-6 py-4 text-sm font-bold uppercase tracking-widest text-stone-900">Name</th>
        <th class="px-6 py-4 text-sm font-bold uppercase tracking-widest text-stone-900">Email</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-stone-200">
      {#each list as usr (usr.id)}
        <tr class="transition-colors hover:bg-stone-50">
          <td class="px-6 py-4 font-mono text-xs text-stone-500">{usr.id}</td>
          <td class="px-6 py-4 text-stone-800">{usr.name}</td>
          <td class="px-6 py-4 italic text-stone-600">{usr.email}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
