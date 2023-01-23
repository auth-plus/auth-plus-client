<script lang="ts">
  import { credential } from '../../stores/auth'
  import type { Strategy } from '../mfa/mfa'

  export let list: Strategy[]
  export let hash: string
  export let setMfaCodeHash: (value: string) => void

  let strategyOption: string | null = null

  async function submitChoose() {
    const mfaCodeHash = await credential.chooseStrategy(
      hash,
      strategyOption as Strategy
    )
    setMfaCodeHash(mfaCodeHash)
  }
</script>

<form on:submit={submitChoose}>
  <label for="login-strategy">Choose One</label>
  <select name="cars" id="login-strategy" bind:value={strategyOption}>
    <option value={null}>-</option>
    {#each list as opt}
      <option value={opt}>{opt}</option>
    {/each}
  </select>
  <input type="submit" value="Choose" />
</form>

<style lang="scss">
  form {
    background-color: cornflowerblue;
    padding: 2vw;
    border-radius: 1vw;
    color: white;
  }
</style>
