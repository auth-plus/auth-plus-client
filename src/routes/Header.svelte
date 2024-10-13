<script lang="ts">
  import { credential, type User } from '../stores/auth'

  let cred: User | null = null

  async function logout() {
    if (cred != null) {
      await credential.logout(cred.token)
      sessionStorage.removeItem('token')
    }
  }

  credential.subscribe((value: User | null) => {
    cred = value
  })
</script>

<nav>
  Auth +
</nav>

<style lang="scss">
  nav {
    background-color: transparent;
    font-family: 'Playfair Display', serif;
    width: 100%;
    display: grid;
    box-sizing: border-box;
    padding: 1vw;
    color: white;
    border-bottom: 2px white solid;
    font-size: larger;
  }
</style>
