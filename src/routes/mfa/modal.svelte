<script lang="ts">
  import { onMount } from 'svelte'
  import { authenticator } from 'otplib'
  import { toDataURL } from 'qrcode'
  import { Strategy } from './mfa'

  export let secret: string
  export let email: string
  export let strategyChoosed: Strategy | null

  let link = ''
  let imgUrl = ''

  onMount(() => {
    if (strategyChoosed === Strategy.GA) {
      const otpauth = authenticator.keyuri(email, 'auth-plus-client', secret)
      link = otpauth
      toDataURL(otpauth, (err, imageUrl) => {
        if (err) {
          return
        }
        imgUrl = imageUrl
      })
    }
  })
</script>

<div>
  {#if imgUrl && link}
    <img src={imgUrl} alt="QR code" class="qr_code" />
  {/if}
  {#if strategyChoosed == Strategy.GA}
    <p>
      Use your time-based one-time password (TOTP) authenticator app to scan the
      QR code displayed above.
    </p>
  {:else if strategyChoosed == Strategy.EMAIL}
    <p>
      You've successfully added email as a new security factor. A verification
      code has been sent to your registered email address. Please check your
      inbox to proceed.
    </p>
  {:else if strategyChoosed == Strategy.PHONE}
    <p>
      We've sent a verification code to your registered phone number. Please
      check your smartphone for the code to complete the setup.
    </p>
  {/if}
</div>

<style lang="scss">
  img.qr_code {
    display: block;
    width: 400px;
    margin: 2vmin auto;
  }
  p {
    color: green;
    text-align: center;
  }
</style>
