<script lang="ts">
  import { onMount } from 'svelte/internal'
  import { credential } from '../../stores/auth'

  import { listInvoice } from './invoices'

  let list: { id: string; user_id: string; status: string }[] = []
  onMount(async () => {
    if (!$credential) {
      throw new Error('credential should be setted')
    }
    list = await listInvoice($credential.id)
  })
</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>USER</th>
      <th>STATUS</th>
    </tr>
  </thead>
  <tbody>
    {#each list as usr}
      <tr>
        <td>{usr.id}</td>
        <td>{usr.user_id}</td>
        <td>{usr.status}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  table {
    width: 90%;
    margin: 0 auto;
    thead {
      background-color: cornflowerblue;
      color: white;
      tr th {
        padding: 2vw;
      }
    }
    tbody {
      tr {
        td {
          padding: 2vw;
          text-align: center;
        }
        &:nth-of-type(odd) {
          background: #eee;
        }
      }
    }
  }
</style>
