<script lang="ts">
  import Create from './create.svelte'
  import Table from './table.svelte'

  let isModalOpen = $state(false)

  function toogleModal() {
    isModalOpen = !isModalOpen
  }
</script>

<div class="min-h-screen bg-stone-50 pb-20 font-serif text-stone-900">
  <header class="mb-10 border-b border-stone-300 px-8 py-12 text-center">
    <h1 class="mb-4 text-5xl uppercase tracking-tight">User Management</h1>
    <p class="mx-auto max-w-2xl italic text-stone-600">
      Curating access and identity within the Auth+ ecosystem.
    </p>
  </header>

  <main class="mx-auto max-w-5xl px-8">
    <Table />
  </main>

  <button
    onclick={toogleModal}
    class="fixed bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-3xl text-white shadow-2xl transition-transform hover:scale-110 hover:bg-stone-700 focus:outline-none">
    +
  </button>

  {#if isModalOpen}
    <Create {toogleModal} />
  {/if}
</div>
