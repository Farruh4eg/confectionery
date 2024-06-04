import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ fetch }: ServerLoadEvent) => {
  const products = await fetch('/v1/products');
  const body = await products.json();
  return { products: body };
};
