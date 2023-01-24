<script lang="ts">
  import { onMount } from 'svelte/internal'
  import { credential } from '../../stores/auth'

  import { listUser } from './users'

  let list: { id: string; name: string; email: string }[] = []
  onMount(async () => {
    if (!$credential) {
      throw new Error('credential should be setted')
    }
    list = await listUser($credential.token)
  })
</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>NAME</th>
      <th>EMAIL</th>
    </tr>
  </thead>
  <tbody>
    {#each list as usr}
      <tr>
        <td>{usr.id}</td>
        <td>{usr.name}</td>
        <td>{usr.email}</td>
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
