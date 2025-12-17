<script lang="ts">
	import { credential, type User } from '../stores/auth'
	import { resolve } from '$app/paths'
	let cred = $state<User | null>(null)

	async function logout() {
		if (cred != null) {
			await credential.logout(cred.token)
			sessionStorage.removeItem('token')
		}
	}

	credential.subscribe((value: User | null) => {
		cred = value
	})
</script>

<nav>
	<ul>
		<li><a href={resolve('/')}>HOME</a></li>
		<li><a href={resolve('/invoices')}>INVOICES</a></li>
		<li><a href={resolve('/mfa')}>MFA</a></li>
		<li><a href={resolve('/users')}>USERS</a></li>
	</ul>
	<div class="user">
		<button onclick={logout} class:isDisabled={cred == null} aria-label="user logout">
			<svg
				version="1.2"
				baseProfile="tiny"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				width="24px"
				height="21px"
				viewBox="-0.8 -0.5 177 202"
				xml:space="preserve"
			>
				<defs />
				<path
					fill="none"
					stroke="#5e4c4c"
					stroke-width="30"
					stroke-linecap="round"
					d="M33.7,64.3C22.1,77.2,15,94.3,15,113
	c0,40.1,32.5,72.7,72.7,72.7c40.1,0,72.7-32.5,72.7-72.7c0-18.7-7.1-35.8-18.7-48.7"
				/>
				<line
					fill="none"
					stroke="#5e4c4c"
					stroke-width="30"
					stroke-linecap="round"
					x1="87.8"
					y1="15"
					x2="87.8"
					y2="113"
				/>
			</svg>
		</button>
	</div>
</nav>

<style lang="scss">
	nav {
		background-color: white;
		font-family: 'Playfair Display', serif;
		width: 100%;
		display: grid;
		grid-template-areas: 'nav user';
		grid-template-columns: 80% 1fr;
		grid-template-rows: 100%;
		box-sizing: border-box;
		padding: 1vw;
		box-shadow: 0 5px 1vmin rgb(221, 221, 221);
		z-index: 100;
		ul {
			width: 100%;
			grid-area: nav;
			justify-self: start;
			align-self: center;
			display: flex;
			justify-content: space-between;
			li {
				border-right: solid 1px rgb(221, 221, 221);
				list-style: none;
				width: 100%;
				display: inline-block;
				padding: 0 1vw;
				text-align: center;
				a {
					text-decoration: none;
					color: rgb(94, 76, 76);
				}
				&:last-child {
					border-right: none;
				}
			}
		}
		div.user {
			grid-area: user;
			justify-self: end;
			align-self: center;
			button {
				background-color: transparent;
				border: none;
				cursor: pointer;
			}
		}
	}
</style>
