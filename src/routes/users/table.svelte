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

<table>
	<thead>
		<tr>
			<th>Id</th>
			<th>Name</th>
			<th>Email</th>
		</tr>
	</thead>
	<tbody>
		{#each list as usr (usr.id)}
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
		margin: 5vmin auto;
		thead {
			background-color: transparent;
			color: rgb(49, 49, 49);

			tr th {
				padding: 1vw;
				text-align: start;
				font-weight: bolder;
			}
		}
		tbody {
			tr {
				td {
					padding: 1vw;
					text-align: start;
					color: rgb(80, 80, 80);
				}
				&:nth-of-type(odd) {
					background: #eee;
				}
			}
		}
	}
</style>
