<script lang="ts">
  import { Secret, TOTP } from 'otpauth'
  import { toDataURL } from 'qrcode'
  import { credential, type User } from '../../../stores/auth'

  type Props = {
    setSecret: (scrt: string) => void
  }
  let { setSecret }: Props = $props()

  let user = $state<User | null>(null)
  let secret = $state(new Secret({ size: 20 }).base32)
  let imgUrl = $state('')

  credential.subscribe((value: User | null) => {
    user = value
  })

  $effect(() => {
    if (user && !imgUrl) {
      let totp = new TOTP({
        issuer: 'Auth+',
        label: user.email,
        algorithm: 'SHA512',
        digits: 6,
        period: 30,
        secret
      })
      const uri = totp.toString()
      toDataURL(uri, (err, imageUrl) => {
        if (!err) {
          imgUrl = imageUrl
          setSecret(secret)
        }
      })
    }
  })
</script>

<div class="flex flex-col items-center justify-center">
  <div
    class="mb-6 border-2 border-stone-900 bg-white p-4 shadow-[8px_8px_0px_0px_rgba(231,229,228,1)]">
    {#if imgUrl}
      <img
        src={imgUrl}
        alt="QR code"
        class="block h-40 w-40 grayscale transition-all duration-700 hover:grayscale-0" />
    {:else}
      <div class="flex h-40 w-40 animate-pulse items-center justify-center bg-stone-100">
        <span class="text-[10px] uppercase tracking-widest text-stone-400">Generating...</span>
      </div>
    {/if}
  </div>

  <div class="px-4 text-center">
    <h3 class="mb-2 text-xs font-black uppercase tracking-[0.2em] text-stone-900">
      Authenticator Link
    </h3>
    <p class="mx-auto max-w-[240px] text-[11px] italic leading-relaxed text-stone-500">
      Scan the TOTP code with your application and provide the 6-digit signature below.
    </p>
  </div>
</div>
