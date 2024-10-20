<script lang="ts">
  import { credential } from '../../stores/auth'

  import { Strategy, createMfa } from './mfa'
  import imageEmailUrl from '$lib/email.jpg'
  import imagePhoneUrl from '$lib/phone.jpg'
  import imageClockUrl from '$lib/clock.jpg'

  export let strategy: Strategy
  export let alreadySetup: boolean
  export let setAction: (strategy: Strategy, mfaId: string) => void

  function getImage() {
    if (strategy === Strategy.PHONE) return imagePhoneUrl
    if (strategy === Strategy.EMAIL) return imageEmailUrl
    if (strategy === Strategy.GA) return imageClockUrl
  }
  async function createNewStrategy() {
    console.log(strategy, alreadySetup)
    if (!alreadySetup) {
      if ($credential === null) {
        throw new Error('Credential shoudl be setted by now')
      }
      const resp = await createMfa($credential.id, strategy, $credential.token)
      setAction(strategy, resp.mfaId)
    }
  }
</script>

<button
  on:click={createNewStrategy}
  class:alreadySetup
  style="background-image: url({getImage()})"
>
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
    cursor: pointer;
    &.alreadySetup {
      cursor: not-allowed;
      filter: grayscale(1) blur(0.5rem);
    }
  }
</style>
