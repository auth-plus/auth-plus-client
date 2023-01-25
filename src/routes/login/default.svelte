<script lang="ts">
  import { credential, type MFAChoose } from '../../stores/auth'

  export let setMfaChoose: (value: MFAChoose) => void

  let email = ''
  let password = ''

  async function submit() {
    const mfaCh = await credential.login(email, password)
    if (mfaCh != null) {
      setMfaChoose(mfaCh)
    } else {
      if (!$credential) {
        throw new Error('credential should be setted')
      }
      sessionStorage.setItem('token', $credential.token)
    }
  }
</script>

<form on:submit={submit}>
  <label for="login-email">Email</label>
  <input id="login-email" bind:value={email} placeholder="enter your email" />
  <label for="login-pw">Password</label>
  <input
    id="login-pw"
    bind:value={password}
    placeholder="enter your password"
  />
  <button type="submit">
    <svg
      fill="#fff"
      height="30px"
      width="30px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 499.1 499.1"
      xml:space="preserve"
    >
      <g>
        <g>
          <g>
            <path
              d="M0,249.6c0,9.5,7.7,17.2,17.2,17.2h327.6l-63.9,63.8c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5
                    l93.1-93.1c6.7-6.7,6.7-17.6,0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3,0c-6.7,6.7-6.7,17.6,0,24.3l63.8,63.8H17.2
                    C7.7,232.5,0,240.1,0,249.6z"
            />
            <path
              d="M396.4,494.2c56.7,0,102.7-46.1,102.7-102.8V107.7C499.1,51,453,4.9,396.4,4.9H112.7C56,4.9,10,51,10,107.7V166
                    c0,9.5,7.7,17.1,17.1,17.1c9.5,0,17.2-7.7,17.2-17.1v-58.3c0-37.7,30.7-68.5,68.4-68.5h283.7c37.7,0,68.4,30.7,68.4,68.5v283.7
                    c0,37.7-30.7,68.5-68.4,68.5H112.7c-37.7,0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10,324.3,10,333.8v57.6
                    c0,56.7,46.1,102.8,102.7,102.8H396.4L396.4,494.2z"
            />
          </g>
        </g>
      </g>
    </svg>
    <span>Login</span>
  </button>
  <button type="button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      width="30px"
      height="30px"
      fill="#fff"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      viewBox="0 0 54.1866 40.64"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g id="Layer_x0020_1">
        <path
          class="fil0"
          d="M29.898 26.5722l-4.3921 0c-0.0118,-0.635 -0.0177,-1.0172 -0.0177,-1.1583 0,-1.4229 0.2352,-2.5929 0.7056,-3.5102 0.4704,-0.9231 1.417,-1.952 2.8281,-3.1044 1.4111,-1.1465 2.2578,-1.8991 2.5282,-2.2578 0.4292,-0.5585 0.6409,-1.1818 0.6409,-1.8579 0,-0.9408 -0.3763,-1.7463 -1.1289,-2.4224 -0.7526,-0.6703 -1.7639,-1.0054 -3.0397,-1.0054 -1.2289,0 -2.2578,0.3527 -3.0868,1.0524 -0.8232,0.6997 -1.3935,1.7698 -1.7051,3.2044l-4.4391 -0.5527c0.1234,-2.0578 0.9995,-3.8041 2.6223,-5.2387 1.6286,-1.4346 3.757,-2.152 6.4029,-2.152 2.7752,0 4.9859,0.7291 6.6322,2.1814 1.6404,1.4522 2.4635,3.1397 2.4635,5.0741 0,1.0642 -0.3057,2.0755 -0.9054,3.028 -0.6056,0.9525 -1.8933,2.2519 -3.8688,3.8923 -1.0231,0.8525 -1.6581,1.5346 -1.905,2.052 -0.2469,0.5174 -0.3587,1.4405 -0.3351,2.7752zm-4.3921 6.5087l0 -4.8389 4.8389 0 0 4.8389 -4.8389 0z"
        />
      </g>
    </svg>
    <span>Esqueci a senha</span>
  </button>
</form>

<style lang="scss">
  form {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
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
      width: 20vw;
    }
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: white;
      display: flex;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }
</style>
