<script lang="ts">
  export let employee, positions;
</script>

<tr>
  <td class="text-center border border-gray-300"
    ><input
      type="text"
      bind:value={employee.lastname}
      on:input={() => console.log(employee.lastname)}
    /></td
  >
  <td class="text-center border border-gray-300"
    ><input type="text" bind:value={employee.firstname} /></td
  >
  <td class="text-center border border-gray-300"
    ><input type="text" bind:value={employee.patronymic} /></td
  >
  <td class="text-center border border-gray-300 p-2"
    ><select name="position" id="position" class="py-2 px-4">
      {#each positions as position}
        {#if position.id == employee.Position.id}
          <option value={position.id} selected>{position.position}</option>
        {:else}
          <option value={position.id}>{position.position}</option>
        {/if}
      {/each}
    </select></td
  >
  <td
    class="text-blue-500 border border-gray-300 text-center p-2 hover:cursor-pointer"
    >Сохранить</td
  >
  <td
    class="text-red-500 border border-gray-300 text-center p-2 hover:cursor-pointer"
    >Удалить</td
  >
</tr>
