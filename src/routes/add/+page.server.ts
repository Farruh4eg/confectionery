import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ fetch }: ServerLoadEvent) => {
  const request = await fetch('/v1/positions');
  const response = await request.json();
  return { positions: response };
};
