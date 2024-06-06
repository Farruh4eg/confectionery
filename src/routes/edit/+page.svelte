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

  let user: UserStorageInfo;
  let role: string;

  onMount(async function () {
    employees = data.employees;
    if (typeof localStorage !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user') || 'null');
    }
  });

  $: {
    role = user?.role;
  }
</script>

{#if role === 'client'}
  {(window.location.href = '/home')}
{:else if role === 'admin'}
  <main
    class="w-[1000px] bg-white rounded-lg shadow-md mx-auto flex flex-col items-center gap-y-4 p-4"
  >
    <h1 class="font-bold text-3xl w-full flex justify-center py-2">
      Редактировать сотрудника
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
        <th class="border border-gray-300 py-2 px-4 text-left"></th>
        <th class="border border-gray-300 py-2 px-4 text-left"></th>
      </thead>
      {#each filteredEmployees as employee}
        <Employee {employee} positions={data.positions} />
      {/each}
    </table>
  </main>
{/if}
