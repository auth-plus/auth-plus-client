<script>
	import { credential } from '../stores/auth';

	let cred;

	async function logout() {
		await credential.logout(cred.token);
		sessionStorage.removeItem('token');
	}

	credential.subscribe((value) => {
		cred = value;
	});
</script>

<nav>
	<div class="logo">Auth+</div>
	<div class="user">
		<button on:click={logout} class:isDisabled={cred == null}>
			<svg
				version="1.2"
				baseProfile="tiny"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
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
					stroke="#FFF"
					stroke-width="30"
					stroke-linecap="round"
					d="M33.7,64.3C22.1,77.2,15,94.3,15,113
	c0,40.1,32.5,72.7,72.7,72.7c40.1,0,72.7-32.5,72.7-72.7c0-18.7-7.1-35.8-18.7-48.7"
				/>
				<line
					fill="none"
					stroke="#FFF"
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
	<ul>
		<li><a href="/">Home</a></li>
		<li class:isDisabled={cred === null}><a href="/invoices">Invoices</a></li>
		<li class:isDisabled={cred === null}><a href="/mfa">Mfa</a></li>
	</ul>
</nav>

<style lang="scss">
	nav {
		background-color: cadetblue;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		width: 100%;
		display: grid;
		grid-template-areas: 'logo user' 'nav nav';
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		box-sizing: border-box;
		padding: 1vw;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
		div.logo {
			grid-area: logo;
			justify-self: start;
			color: white;
			font-size: larger;
		}
		div.user {
			grid-area: user;
			justify-self: end;
			button {
				background-color: transparent;
				border: none;
				cursor: pointer;
			}
		}
		ul {
			grid-area: nav;
			justify-self: center;
			li {
				list-style: none;
				display: inline-block;
				padding: 0 1vw;
				a {
					text-decoration: none;
					color: white;
				}
			}
		}
	}
	.isDisabled {
		display: none;
	}
</style>
