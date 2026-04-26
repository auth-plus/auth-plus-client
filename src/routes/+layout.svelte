<script>
  import '../app.css'
  import Menu from './Menu.svelte'

  import { onMount } from 'svelte'
  import { credential } from '../stores/auth'

  let { children } = $props()

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

<div class="flex min-h-screen w-full flex-col bg-stone-50 font-serif text-stone-900">
    <Menu />
    <main class="flex-grow bg-white">
      <div class="mx-auto max-w-7xl px-8 py-12">
        {@render children?.()}
      </div>
    </main>
</div>

<style>
  :global(body) {
    margin: 0;
    /* Updated global font to match the Gallery aesthetic */
    font-family: 'Playfair Display', serif;
    background-color: #f5f5f4; /* stone-100 */
  }
</style>
