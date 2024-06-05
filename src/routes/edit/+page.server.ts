import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ fetch }: ServerLoadEvent) => {
  const employeesRequest = await fetch('/v1/employees');
  const employeesResponse = await employeesRequest.json();
  const positionsRequest = await fetch('/v1/positions');
  const positionsResponse = await positionsRequest.json();
  return { employees: employeesResponse, positions: positionsResponse };
};
