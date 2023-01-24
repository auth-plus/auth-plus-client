<script lang="ts">
  import { createNewUser } from './users'
  import { credential } from '../../stores/auth'

  export let toogleModal: () => void
  let name = ''
  let email = ''
  let password = ''
  async function createNew() {
    if (!$credential) {
      throw new Error('credential should be setted')
    }
    await createNewUser(name, email, password, $credential.token)
    toogleModal()
  }
</script>

<div class="modal">
  <form on:submit={createNew}>
    <label for="login-email">Name</label>
    <input id="login-email" bind:value={name} placeholder="enter username" />
    <label for="login-email">Email</label>
    <input id="login-email" bind:value={email} placeholder="enter user email" />
    <label for="login-pw">Password</label>
    <input
      id="login-pw"
      bind:value={password}
      placeholder="enter user password"
    />
    <div class="button-row">
      <button class="negative" on:click={toogleModal}>Close</button>
      <button class="positive" type="submit"> Create </button>
    </div>
  </form>
</div>

<style lang="scss">
  div.modal {
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    overflow: auto;
  }
  form {
    position: relative;
    z-index: 200;
    width: 30%;
    margin: 30% auto;
    box-sizing: border-box;
    background-color: cornflowerblue;
    padding: 2vw;
    border-radius: 1vw;
    color: white;
    label {
      display: block;
    }
    input {
      margin: 0.5vw 0;
      display: block;
      padding: 5px;
      border-radius: 3px;
      border: none;
      width: 100%;
      box-sizing: border-box;
    }
    div.button-row {
      display: flex;
      justify-content: space-between;
      button {
        background-color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 0.5vw;
        &.positive {
          color: rgb(22, 143, 103);
        }
        &.negative {
          color: rgb(143, 22, 22);
        }
      }
    }
  }
</style>
