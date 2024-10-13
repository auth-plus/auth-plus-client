<script lang="ts">
  import Table from './table.svelte'
</script>

<section class="description">
  <h2>
    Reviewing a complete list of invoices generated for your transactions.
  </h2>
  <p>
    Whenever a new multi-factor authentication (MFA) is created, either for an
    individual user or an entire organization, an invoice will be generated.
  </p>
</section>

<section class="invoice_list">
  <Table />
</section>

<style lang="scss">
  section.description {
    padding: 5vmin;
    max-width: 60%;
  }
  section.invoice_list {
    width: 100%;
    padding: 3vmin;
    background-color: rgb(240, 230, 209);
  }
</style>
