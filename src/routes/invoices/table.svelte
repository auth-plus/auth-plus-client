<script lang="ts">
  import { onMount } from 'svelte'
  import { credential } from '../../stores/auth'
  import { listInvoice } from './invoices'

  let list = $state<{ id: string; user_id: string; status: string }[]>([])

  onMount(async () => {
    if (!$credential) {
      throw new Error('credential should be setted')
    }
    list = await listInvoice($credential.id)
  })
</script>

<div class="overflow-hidden bg-white p-6 shadow-2xl sm:p-10">
  <div class="overflow-x-auto">
    <table class="w-full text-left font-serif">
      <thead>
        <tr class="border-b-2 border-stone-800 uppercase tracking-[0.2em] text-stone-500">
          <th class="pb-4 pt-2 text-sm font-bold">ID</th>
          <th class="pb-4 pt-2 text-sm font-bold">User Identifier</th>
          <th class="pb-4 pt-2 text-sm font-bold">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-stone-100">
        <tr class="group transition-colors hover:bg-stone-50">
          <td class="py-6 font-mono text-xs text-stone-400"
            >824ebdd6-7ee9-46b7-b3f8-1ca41a39fd55</td>
          <td class="py-6 text-stone-600">a77aa649-5cdc-4d74-a695-6d2917c32619</td>
          <td class="py-6 italic text-stone-500 underline underline-offset-4">pending</td>
        </tr>

        {#each list as usr (usr.id)}
          <tr class="group transition-colors hover:bg-stone-50">
            <td class="py-6 font-mono text-xs text-stone-400">{usr.id}</td>
            <td class="py-6 text-stone-600">{usr.user_id}</td>
            <td class="py-6">
              <span
                class="border-l-2 border-stone-400 pl-3 text-xs uppercase italic tracking-widest text-stone-800">
                {usr.status}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
