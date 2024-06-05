<script lang="ts">
  export let data;
  let employeeForm: HTMLFormElement, positionForm: HTMLFormElement;
  let positionDialog: HTMLDialogElement;
  let notice: HTMLParagraphElement;

  const dangerousPattern = /[<>&"'`;|:]/g;

  function sanitizeInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(dangerousPattern, '');
  }

  async function submitEmployeeForm() {
    const formData = new FormData(employeeForm);
    const lastname = formData.get('lastname');
    const firstname = formData.get('firstname');
    const patronymic = formData.get('patronymic');
    const position = formData.get('position');
    const body = JSON.stringify({ lastname, firstname, patronymic, position });

    const response = await fetch('/v1/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.ok) {
      notice.textContent = 'Сотрудник успешно создан';
    } else {
      notice.textContent = `Ошибка. ${response.statusText}`;
    }
  }

  async function submitPositionForm() {
    const formData = new FormData(positionForm);
    const position = formData.get('position');
    const salary = formData.get('salary');
    const body = JSON.stringify({ position, salary });

    const response = await fetch('/v1/positions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.ok) {
      window.location.href = '/add';
    }
  }

  function handleDialogClick(event: MouseEvent) {
    if (
      event.target === positionDialog &&
      !positionDialog.contains(event.relatedTarget as Node)
    ) {
      positionDialog.close();
    }
  }

  function showDialog() {
    positionDialog.showModal();
  }
</script>

<main class="w-[1000px] mx-auto bg-white rounded-lg shadow-md">
  <h1 class="font-bold text-3xl w-full flex justify-center py-2">
    Добавить сотрудника
  </h1>
  <form
    autocomplete="off"
    class="w-full flex items-center p-4 flex-col gap-y-4 text-lg"
    bind:this={employeeForm}
    on:submit|preventDefault={submitEmployeeForm}
  >
    <input
      type="text"
      name="lastname"
      id="lastname"
      placeholder="Фамилия"
      class="border border-gray-400 rounded-md py-2 w-96 px-1"
      required
      on:input={sanitizeInput}
    />
    <input
      type="text"
      name="firstname"
      id="firstname"
      placeholder="Имя"
      class="border border-gray-400 rounded-md py-2 w-96 px-1"
      required
      on:input={sanitizeInput}
    />
    <input
      type="text"
      name="patronymic"
      id="patronymic"
      placeholder="Отчество"
      class="border border-gray-400 rounded-md py-2 w-96 px-1"
      required
      on:input={sanitizeInput}
    />
    <section class="flex gap-x-4 items-center w-96">
      <select
        name="position"
        id="position"
        class="py-2 px-2 w-full text-lg"
        required
      >
        <option value="" disabled selected hidden>Выберите должность</option>
        {#each data.positions as position}
          <option value={position.id}>{position.position}</option>
        {/each}
      </select>
      <span
        class="text-5xl text-blue-600 font-bold hover:cursor-pointer"
        on:click={showDialog}>+</span
      >
    </section>
    <p bind:this={notice} class="text-xl"></p>
    <button class="bg-blue-600 text-white text-xl py-2 px-6 rounded-lg"
      >Добавить</button
    >
  </form>
</main>

<dialog
  id="loginDialog"
  bind:this={positionDialog}
  on:click={handleDialogClick}
  class="w-[30rem] justify-center rounded-3xl h-[36rem] mx-auto mt-12 shadow-lg"
>
  <form
    on:submit|preventDefault={submitPositionForm}
    bind:this={positionForm}
    class="w-full flex flex-col p-4 gap-y-12 h-[36rem] items-center justify-center"
    id="loginForm"
  >
    <h1 class="font-bold text-2xl">Создать должность</h1>
    <input
      type="text"
      name="position"
      id="position"
      class="border border-gray-400 rounded-md py-2 w-96 px-1"
      placeholder="Должность"
      required
    />
    <input
      type="number"
      name="salary"
      id="salary"
      class="border border-gray-400 rounded-md py-2 w-96 px-1"
      placeholder="Зарплата"
      required
    />
    <button class="bg-blue-600 text-white text-xl py-2 px-6 rounded-lg"
      >Добавить</button
    >
  </form>
</dialog>
