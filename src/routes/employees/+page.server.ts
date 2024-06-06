import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ fetch }: ServerLoadEvent) => {
  const employeesRequest = await fetch('/v1/employees');
  const employeesResponse = await employeesRequest.json();
  return { employees: employeesResponse };
};
