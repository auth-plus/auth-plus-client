<script lang="ts">
  import type { MFAChoose } from '../../stores/auth'
  import Choose from './choose.svelte'
  import Code from './code.svelte'
  import Default from './default.svelte'

  let mfaChoose = $state<MFAChoose | null>(null)
  let mfaCodeHash = $state<string | null>(null)

  function setMfaChoose(value: MFAChoose) {
    mfaChoose = value
  }
  function setMfaCodeHash(value: string) {
    mfaCodeHash = value
  }
</script>

<div class="min-h-screen bg-stone-50 font-serif">
  {#if mfaChoose == null && mfaCodeHash == null}
    <Default {setMfaChoose} />
  {/if}

  {#if mfaChoose != null && mfaCodeHash == null}
    <Choose hash={mfaChoose.hash} list={mfaChoose.strategyList} {setMfaCodeHash} />
  {/if}

  {#if mfaCodeHash != null}
    <Code hash={mfaCodeHash} />
  {/if}
</div>