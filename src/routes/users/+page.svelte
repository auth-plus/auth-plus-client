<script lang="ts">
  import Create from './create.svelte'
  import Table from './table.svelte'

  let isModalOpen = false

  function toogleModal() {
    isModalOpen = !isModalOpen
  }
</script>

<h2>Users</h2>

<button on:click={toogleModal}>+</button>
<Table />

{#if isModalOpen}
  <Create {toogleModal} />
{/if}

<style lang="scss">
  button {
    background-color: rgb(100, 149, 237);
    color: white;
    border: none;
    border-radius: 3vmin;
    width: 6vmin;
    height: 6vmin;
    padding: 0.5vw;
    font-size: xx-large;
    position: fixed;
    bottom: 5vw;
    right: 5vw;
    &:hover {
      background-color: rgb(62, 122, 235);
    }
  }
</style>
