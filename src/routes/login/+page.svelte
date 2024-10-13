<script lang="ts">
  import type { MFAChoose } from '../../stores/auth'
  import Choose from './choose.svelte'
  import Code from './code.svelte'
  import Default from './default.svelte'

  let mfaChoose: MFAChoose | null = null
  let mfaCodeHash: string | null = null

  function setMfaChoose(value: MFAChoose) {
    mfaChoose = value
  }
  function setMfaCodeHash(value: string) {
    mfaCodeHash = value
  }
</script>

<div class="login_content">
  {#if mfaChoose == null && mfaCodeHash == null}
    <Default {setMfaChoose} />
  {/if}
  
  {#if mfaChoose != null && mfaCodeHash == null}
    <Choose
      hash={mfaChoose.hash}
      list={mfaChoose.strategyList}
      {setMfaCodeHash}
    />
  {/if}
  
  {#if mfaCodeHash != null}
    <Code hash={mfaCodeHash} />
  {/if}
</div>

<style lang="scss">
  div.login_content {
    flex-grow: 1;
  }
</style>
