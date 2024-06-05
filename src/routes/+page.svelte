<script lang="ts">
  export let data;
</script>

<main
  class="w-[1000px] mx-auto flex flex-col gap-y-8 items-center p-6 bg-white shadow-md rounded-xl border border-gray-100"
>
  <h1 class="font-bold text-3xl">Самые продаваемые изделия</h1>
  <table class="text-center border border-gray-300 w-4/5 text-xl">
    <thead>
      <th class="border border-gray-300">id</th>
      <th class="border border-gray-300">Название изделия</th>
      <th class="border border-gray-300">Продано</th>
    </thead>
    <tbody>
      {#if data}
        {#each data.products as product}
          <tr>
            <td class="border border-gray-300">{product.product_id}</td>
            <td class="border border-gray-300">{product.product_name}</td>
            <td class="border border-gray-300">{product.total_sold} шт.</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</main>
