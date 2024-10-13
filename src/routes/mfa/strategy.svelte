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

<button class={strategy} on:click={createNewStrategy} class:isEnable>
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
    width: 300px;
    height: 300px;
    border-radius: 2vw;
    border: 1px solid rgb(105, 105, 105);
    background-position: center;
    background-size: cover;
    color: rgb(0, 0, 0);
    font-weight: 700;
    font-size: xx-large;
    &.isEnable {
      filter: grayscale(1) blur(0.5rem);
    }
    &.EMAIL {
      background-image: url('email.jpg');
    }
    &.PHONE {
      background-image: url('phone.jpg');
    }
    &.GOOGLE_AUTHENTICATOR {
      background-image: url('clock.jpg');
    }
  }
</style>
