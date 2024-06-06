<script lang="ts">
  import type { Employee } from '@prisma/client';

  export let employee: Employee, positions;

  let originalEmployee = { ...employee };
  let isChanged = false;

  $: isChanged =
    employee.lastname !== originalEmployee.lastname ||
    employee.firstname !== originalEmployee.firstname ||
    employee.patronymic !== originalEmployee.patronymic ||
    employee.id_position !== originalEmployee.id_position;

  const dangerousPattern = /[<>&"'`;|:?/\\]/g;

  function sanitizeInput(event: Event, key: keyof Employee) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(dangerousPattern, '');
    (employee[key] as unknown as string) = value;
  }

  async function saveEmployee() {
    try {
      const response = await fetch(`/v1/employees?id=${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        originalEmployee = { ...employee };
        alert('Данные сотрудника успешно изменены');
      } else {
        alert('Ошибка при изменении данных сотрудника');
      }
    } catch (error) {
      console.error('Ошибка при изменении данных сотрудника', error);
      alert('Ошибка при изменении данных сотрудника');
    }
  }

  async function deleteEmployee() {
    try {
      const response = await fetch(`/v1/employees?id=${employee.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Сотрудник успешно удален');
        window.location.reload();
      } else {
        alert('Ошибка при удалении сотрудника');
      }
    } catch (error) {
      console.error('Ошибка при удалении сотрудника', error);
      alert('Ошибка при удалении сотрудника');
    }
  }
</script>

<tr class:changed={isChanged}>
  <td class="text-center border border-gray-300">
    <input
      type="text"
      bind:value={employee.lastname}
      on:input={(event) => sanitizeInput(event, 'lastname')}
      class="border border-gray-300 p-1"
    />
  </td>
  <td class="text-center border border-gray-300">
    <input
      type="text"
      bind:value={employee.firstname}
      on:input={(event) => sanitizeInput(event, 'firstname')}
      class="border border-gray-300 p-1"
    />
  </td>
  <td class="text-center border border-gray-300">
    <input
      type="text"
      bind:value={employee.patronymic}
      on:input={(event) => sanitizeInput(event, 'patronymic')}
      class="border border-gray-300 p-1"
    />
  </td>
  <td class="text-center border border-gray-300 p-2">
    <select
      name="position"
      id="position"
      bind:value={employee.id_position}
      class="py-2 px-4"
    >
      {#each positions as position}
        <option value={position.id}>{position.position}</option>
      {/each}
    </select>
  </td>
  <td
    class="text-blue-500 border border-gray-300 text-center p-2 hover:cursor-pointer"
    on:click={saveEmployee}
  >
    Сохранить
  </td>
  <td
    class="text-red-500 border border-gray-300 text-center p-2 hover:cursor-pointer"
    on:click={deleteEmployee}
  >
    Удалить
  </td>
</tr>

<style>
  .changed {
    background-color: rgb(230, 230, 230);
  }
</style>
