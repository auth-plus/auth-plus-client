<script lang="ts">
  import { Strategy } from './mfa'
  import imageEmailUrl from '$lib/email.jpg'
  import imagePhoneUrl from '$lib/phone.jpg'
  import imageClockUrl from '$lib/clock.jpg'

  type Props = {
    strategy: Strategy
    alreadySetup: boolean
    setChoose: (strategy: Strategy) => void
  }
  let { alreadySetup, setChoose, strategy }: Props = $props()

  function getImage() {
    if (strategy === Strategy.PHONE) return imagePhoneUrl
    if (strategy === Strategy.EMAIL) return imageEmailUrl
    if (strategy === Strategy.GA) return imageClockUrl
  }
</script>

<div class="group block">
  <div class="bg-white p-4 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
    <button
      onclick={() => setChoose(strategy)}
      disabled={alreadySetup}
      class="relative aspect-[3/4] w-full overflow-hidden bg-cover bg-center transition-all duration-700 {alreadySetup
        ? 'cursor-not-allowed blur-sm grayscale'
        : 'cursor-pointer grayscale hover:grayscale-0'}"
      style="background-image: url({getImage()})">
      <span
        class="absolute bottom-0 left-0 border-r border-t border-stone-200 bg-white px-4 py-2 font-serif font-bold uppercase tracking-widest text-stone-900">
        {#if strategy === Strategy.PHONE}
          PHONE
        {:else if strategy === Strategy.EMAIL}
          EMAIL
        {:else if strategy === Strategy.GA}
          TOTP
        {/if}
      </span>
    </button>
  </div>

  <div class="mt-4 border-l-2 border-stone-400 pl-4">
    <h4 class="text-xl font-bold uppercase tracking-widest text-stone-900">{strategy}</h4>
    <p class="text-sm italic text-stone-600">
      {alreadySetup ? 'Permanent Collection' : 'Available for Setup'}
    </p>
  </div>
</div>
