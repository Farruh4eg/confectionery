<script lang="ts">
  import { isLoggedIn } from '$lib/session';
  import { onMount } from 'svelte';
  import '../app.css';

  let user: UserStorageInfo;
  let role: string;

  onMount(() => {
    if (typeof localStorage !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user') || 'null');
    }
  });

  $: {
    role = user?.role;
    if (!role) {
      isLoggedIn.set(false);
    } else {
      isLoggedIn.set(true);
    }
  }
</script>

{#if !isLoggedIn}
  {(window.location.href = '/login')}
{:else}
  <nav
    class="w-[1000px] bg-white mx-auto rounded-b-lg border border-gray-300 flex gap-x-2 justify-evenly p-2 text-xl shadow-sm mb-8"
  >
    <a
      href="/home"
      class="flex flex-col gap-y-1 hover:bg-gray-100 rounded-lg py-2 px-6 justify-end"
    >
      <svg
        fill="#0000F9"
        class="h-8"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 360 360"
        xml:space="preserve"
        stroke="#0000F9"
        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g><g id="SVGRepo_iconCarrier">
          <path
            d="M352.163,163.115L198.919,9.871c-10.449-10.449-27.389-10.449-37.838,0L7.837,163.115c-7.652,7.652-9.94,19.16-5.8,29.158 c4.142,9.998,13.898,16.516,24.719,16.516h20.762v114.574c0,19.112,15.493,34.603,34.603,34.603h195.758 c19.11,0,34.603-15.492,34.603-34.603V208.789h20.762c10.821,0,20.578-6.519,24.719-16.516 C362.103,182.275,359.815,170.767,352.163,163.115z M220.431,307.785h-80.862v-45.583c0-22.33,18.102-40.431,40.431-40.431 s40.431,18.1,40.431,40.431V307.785z"
          ></path>
        </g></svg
      >
      Главная</a
    >
    {#if role === 'admin'}
      <a
        href="/add"
        class="flex flex-col gap-y-1 hover:bg-gray-100 rounded-lg py-2 px-6 justify-end"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8"
          ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g><g id="SVGRepo_iconCarrier">
            <path
              d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
              fill="#0000F9"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
              fill="#0000F9"
            ></path>
          </g></svg
        >
        Добавить</a
      >
      <a
        href="/edit"
        class="flex flex-col gap-y-1 hover:bg-gray-100 rounded-lg py-2 px-6 justify-end"
      >
        <svg
          viewBox="0 0 24 24"
          class="h-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g><g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
              fill="#0000F9"
            ></path>
          </g></svg
        >
        Редактировать</a
      >
    {/if}
    <a
      href="/employees"
      class="flex flex-col gap-y-1 hover:bg-gray-100 rounded-lg py-2 px-6 justify-end"
    >
      <svg
        class="h-8"
        version="1.1"
        id="_x32_"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
        fill="#000000"
        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g><g id="SVGRepo_iconCarrier">
          <style type="text/css">
            .st0 {
              fill: #0000f9;
            }
          </style>
          <g>
            <path
              class="st0"
              d="M194.651,414.476c16.23,0,61.349,0,61.349,0s45.111,0,61.35,0c16.222,0,23.587-23.603,14.198-40.285 c-7.072-12.572-18.659-26.826-37.516-34.921c-10.793,7.556-23.905,12-38.032,12c-14.143,0-27.238-4.444-38.032-12 c-18.864,8.095-30.444,22.349-37.523,34.921C171.064,390.873,178.421,414.476,194.651,414.476z"
            ></path>
            <path
              class="st0"
              d="M256,335.476c27.714,0,50.167-22.444,50.167-50.159v-12.016c0-27.714-22.452-50.174-50.167-50.174 c-27.714,0-50.174,22.46-50.174,50.174v12.016C205.826,313.032,228.286,335.476,256,335.476z"
            ></path>
            <path
              class="st0"
              d="M404.977,56.889h-75.834v16.254c0,31.365-25.524,56.889-56.889,56.889h-32.508 c-31.365,0-56.889-25.524-56.889-56.889V56.889h-75.833c-25.445,0-46.072,20.627-46.072,46.071v362.969 c0,25.444,20.627,46.071,46.072,46.071h297.952c25.444,0,46.071-20.627,46.071-46.071V102.96 C451.048,77.516,430.421,56.889,404.977,56.889z M402.286,463.238H109.714V150.349h292.572V463.238z"
            ></path>
            <path
              class="st0"
              d="M239.746,113.778h32.508c22.406,0,40.635-18.23,40.635-40.635V40.635C312.889,18.23,294.659,0,272.254,0 h-32.508c-22.405,0-40.635,18.23-40.635,40.635v32.508C199.111,95.547,217.341,113.778,239.746,113.778z M231.619,40.635 c0-4.492,3.635-8.127,8.127-8.127h32.508c4.493,0,8.127,3.635,8.127,8.127v16.254c0,4.492-3.634,8.127-8.127,8.127h-32.508 c-4.492,0-8.127-3.635-8.127-8.127V40.635z"
            ></path>
          </g>
        </g></svg
      >
      Сотрудники
    </a>
    <a
      href="/login"
      class="flex flex-col gap-y-1 hover:bg-gray-100 rounded-lg py-2 px-6 justify-end"
    >
      <svg
        class="h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g><g id="SVGRepo_iconCarrier"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 3.93a.75.75 0 0 1 1.177-.617l4.432 3.069a.75.75 0 0 1 0 1.233l-4.432 3.069A.75.75 0 0 1 16 10.067V8H4a1 1 0 0 1 0-2h12V3.93zm-9.177 9.383A.75.75 0 0 1 8 13.93V16h12a1 1 0 1 1 0 2H8v2.067a.75.75 0 0 1-1.177.617l-4.432-3.069a.75.75 0 0 1 0-1.233l4.432-3.069z"
            fill="#0000F9"
          ></path></g
        ></svg
      >
      Смена учетной записи
    </a>
  </nav>
{/if}
<slot />

<style lang="postcss">
  :global(html) {
    margin: 0;
    background-color: rgb(243, 244, 246);
    width: 100vw;
    overflow-x: hidden;
  }
</style>
