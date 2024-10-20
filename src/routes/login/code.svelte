<script lang="ts">
  import { credential } from '../../stores/auth'

  export let hash: string

  let code = ''

  async function submitCode() {
    await credential.loginCode(hash, code)
  }
</script>

<form on:submit={submitCode}>
  <label for="login-code">Enter the verification code sent to you</label>
  <input id="login-code" bind:value={code} placeholder="123456" />
  <input type="submit" value="Sign In" />
</form>

<style lang="scss">
  form {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 2vw;
    border-radius: 1vw;
    color: white;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 1vmin;
    input {
      margin: 0.5vw 0;
      display: block;
      padding: 1vmin;
      border-radius: 3px;
      border: none;
      width: 100%;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
</style>
