import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ fetch }: ServerLoadEvent) => {
  const products = await fetch('/v1/products?top=true');
  const body = await products.json();
  return { products: body };
};
