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
    <img
      src={imgUrl}
      alt=""
      on:click={() => window.open(link)}
      on:keypress={() => window.open(link)}
    />
  {/if}
  {strategyChoosed}
  {#if strategyChoosed == Strategy.GA}
    <p>Please use your TOPTP Authenticator in QR above</p>
  {:else}
    <p>A message was sent to you, please check you email/phone</p>
  {/if}
</div>
