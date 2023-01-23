<script>
	import Choose from './choose.svelte';
	import Code from './code.svelte';
	import Default from './default.svelte';

	let mfaChoose = null;
	let mfaCodeHash = null;

	function setMfaChoose(value) {
		mfaChoose = value;
	}
	function setMfaCodeHash(value) {
		mfaCodeHash = value;
	}
</script>

{#if mfaChoose == null && mfaCodeHash == null}
	<Default {setMfaChoose} />
{/if}

{#if mfaChoose != null && mfaCodeHash == null}
	<Choose hash={mfaChoose.hash} list={mfaChoose.strategyList} {setMfaCodeHash} />
{/if}

{#if mfaCodeHash != null}
	<Code hash={mfaCodeHash} />
{/if}
