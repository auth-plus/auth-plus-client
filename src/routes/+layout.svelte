<script lang="ts">
  import Header from './Header.svelte'
  import Menu from './Menu.svelte'

  import { onMount } from 'svelte'
  import { credential } from '../stores/auth'
  import Login from './login/+page.svelte'
  import imageUrl from '$lib/login_background.jpg'

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
</script>

<div class="main_content" style="background-image: url({imageUrl})">
  {#if $credential === null}
    <Header />
    <Login />
  {:else}
    <Menu />
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
    background-color: #000;
    display: flex;
    flex-direction: column;
    main {
      background-color: white;
      flex-grow: 1;
    }
  }
</style>
