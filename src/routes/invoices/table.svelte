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

<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>USER</th>
			<th>STATUS</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>824ebdd6-7ee9-46b7-b3f8-1ca41a39fd55</td>
			<td>a77aa649-5cdc-4d74-a695-6d2917c32619</td>
			<td>pending</td>
		</tr>
		{#each list as usr (usr.id)}
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
