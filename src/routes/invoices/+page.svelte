<script lang="ts">
  import Table from './table.svelte'
</script>

<div class="min-h-screen bg-stone-50 font-serif text-stone-900">
  <section class="mx-auto max-w-4xl px-8 py-16 text-center lg:py-24">
    <h2 class="mb-6 text-4xl uppercase tracking-tight text-stone-800">Invoice Ledger</h2>
    <p class="mx-auto max-w-2xl text-lg italic leading-relaxed text-stone-600">
      Whenever a new multi-factor authentication (MFA) is created, either for an individual user or
      an entire organization, a unique invoice is generated and archived here.
    </p>
  </section>

  <section class="bg-stone-200 py-12 shadow-inner">
    <div class="mx-auto max-w-6xl px-4 md:px-8">
      <Table />
    </div>
  </section>
</div>
