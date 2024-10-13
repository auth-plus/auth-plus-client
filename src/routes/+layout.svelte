<script lang="ts">
  import Header from './Header.svelte'
  import Menu from './Menu.svelte'

  import { onMount } from 'svelte'
  import { credential, type User } from '../stores/auth'
  import Login from './login/+page.svelte'

  let user: User | null = null
  onMount(async () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      try {
        const newToken = await credential.refresh(token)
        sessionStorage.setItem('token', newToken)
      } catch (error) {
        console.error(error)
        sessionStorage.removeItem('token')
        credential.logout(token)
      }
    }
  })
  credential.subscribe((value) => {
    user = value
  })
</script>


<div class="main_content">
  {#if $credential === null}
    <Header />
    <Login />
  {:else}
    <Menu/>
    <main>
      <slot />
    </main>
  {/if}
</div>

<style lang="scss">
  div.main_content {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-image: url("login_background.jpg");
    background-color: #000;
    display: flex;
    flex-direction: column;
    main {
      background-color: white;
      flex-grow: 1;
    }
  }
</style>
