import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ fetch }: ServerLoadEvent) => {
  throw redirect(302, '/login');
};
