<script lang="ts">
  import { credential } from '../../stores/auth'

  export let hash: string

  let code = ''

  async function submitCode() {
    await credential.loginCode(hash, code)
  }
</script>

<form on:submit={submitCode}>
  <label for="login-code">Code</label>
  <input id="login-code" bind:value={code} placeholder="123456" />
  <input type="submit" value="Login" />
</form>

<style lang="scss">
  form {
    background-color: cornflowerblue;
    padding: 2vw;
    border-radius: 1vw;
    color: white;
  }
</style>
