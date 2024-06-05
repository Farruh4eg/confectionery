<script lang="ts">
  import Employee from '../../components/Employee.svelte';

  export let data;
  $: console.log(data);
</script>

<main class="w-[1000px] bg-white rounded-lg shadow-md mx-auto">
  <table class="w-full border border-gray-300">
    <thead>
      <th class="border border-gray-300 py-2 px-4 text-left">Фамилия</th>
      <th class="border border-gray-300 py-2 px-4 text-left">Имя</th>
      <th class="border border-gray-300 py-2 px-4 text-left">Отчество</th>
      <th class="border border-gray-300 py-2 px-4 text-left">Должность</th>
      <th class="border border-gray-300 py-2 px-4 text-left"></th>
      <th class="border border-gray-300 py-2 px-4 text-left"></th>
    </thead>
    {#each data.employees as employee}
      <Employee {employee} positions={data.positions} />
    {/each}
  </table>
</main>
