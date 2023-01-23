<script lang="ts">
  import { onMount } from 'svelte/internal'
  import { credential } from '../../stores/auth'

  import { listUser } from './users'

  let list: { id: string; name: string; email: string }[] = [
    {
      id: '049ef438-97f9-11ed-85ee-0242ac170008',
      email: 'asdasd@sadasda.com',
      name: 'asdasdasdasdasd',
    },
    {
      id: '33191e06-8c3c-11ed-baa0-0242ac150004',
      email: 'asdasd@sadasda.com',
      name: 'asdasdasdasdasd',
    },
    {
      id: '82de4f8c-c844-11eb-bf22-0242ac150003',
      email: 'asdasd@sadasda.com',
      name: 'asdasdasdasdasd',
    },
    {
      id: 'f440ec38-dad0-4939-bd88-3536a0a38e56',
      email: 'asdasd@sadasda.com',
      name: 'asdasdasdasdasd',
    },
    {
      id: '5d1e3cac-98eb-11ed-aae3-0242ac160005',
      email: 'asdasd@sadasda.com',
      name: 'asdasdasdasdasd',
    },
  ]

  //   onMount(async () => {
  //     if (!$credential) {
  //       throw new Error('credential should be setted')
  //     }
  //     list = await listUser($credential.token)
  //   })
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
