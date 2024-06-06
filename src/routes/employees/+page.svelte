<script lang="ts">
  import { onMount } from 'svelte';
  import Employee from '../../components/Employee.svelte';

  interface Employees {
    id: number;
    lastname: string;
    firstname: string;
    patronymic: string;
    id_position: number;
    Position: {
      position: string;
      id: number;
    };
  }

  export let data;

  let searchValue: string = '';

  $: employees = [] as Employees[];
  $: filteredEmployees = employees.filter(
    (employee) =>
      employee.lastname.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.patronymic.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.Position.position
        .toLowerCase()
        .includes(searchValue.toLowerCase())
  );

  onMount(async function () {
    employees = data.employees;
  });
</script>

<main
  class="w-[1000px] bg-white rounded-lg shadow-md mx-auto flex flex-col items-center gap-y-4 p-4"
>
  <h1 class="font-bold text-3xl w-full flex justify-center py-2">
    Список сотрудников
  </h1>
  <input
    type="search"
    name="search"
    id="search"
    class="border border-gray-300 w-96 p-2"
    placeholder="Ключевое слово"
    bind:value={searchValue}
  />
  <table class="w-full border border-gray-300">
    <thead>
      <th class="border border-gray-300 py-2 px-4 text-left">Фамилия</th>
      <th class="border border-gray-300 py-2 px-4 text-left">Имя</th>
      <th class="border border-gray-300 py-2 px-4 text-left">Отчество</th>
      <th class="border border-gray-300 py-2 px-4 text-left">Должность</th>
    </thead>
    {#each filteredEmployees as employee}
      <tr>
        <td class="text-center border border-gray-300">
          <input
            type="text"
            bind:value={employee.lastname}
            disabled
            class=" p-1"
          />
        </td>
        <td class="text-center border border-gray-300">
          <input
            type="text"
            bind:value={employee.firstname}
            disabled
            class=" p-1"
          />
        </td>
        <td class="text-center border border-gray-300">
          <input
            type="text"
            bind:value={employee.patronymic}
            disabled
            class=" p-1"
          />
        </td>
        <td class="text-center border border-gray-300">
          <input type="text" bind:value={employee.Position.position} disabled />
        </td>
      </tr>
    {/each}
  </table>
</main>
