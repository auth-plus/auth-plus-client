<script lang="ts">
  import { credential } from '../../stores/auth'

  import { Strategy, createMfa } from './mfa'
  export let strategy: Strategy
  export let isEnable: boolean
  export let setAction: (strategy: Strategy, mfaId: string) => void

  async function createNewStrategy() {
    console.log(strategy, isEnable)
    if (!isEnable) {
      if ($credential === null) {
        throw new Error('Credential shoudl be setted by now')
      }
      const resp = await createMfa($credential.id, strategy, $credential.token)
      setAction(strategy, resp.mfaId)
    }
  }
</script>

<button on:click={createNewStrategy} class:isEnable>
  {#if strategy === Strategy.PHONE}
    PHONE
  {:else if strategy === Strategy.EMAIL}
    EMAIL
  {:else if strategy === Strategy.GA}
    GA
  {/if}
</button>

<style lang="scss">
  button {
    margin-right: 2vw;
    width: 10vw;
    height: 10vw;
    border-radius: 2vw;
    border: 0.5vw rgb(185, 53, 49) solid;
    background-color: transparent;
    &.isEnable {
      border: 0.5vw rgb(51, 182, 84) solid;
    }
  }
</style>
