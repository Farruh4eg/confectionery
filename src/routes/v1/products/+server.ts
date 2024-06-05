import { getReadOnlyPrisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  interface TopSellingProducts {
    id: number;
    name: string;
    total_sold: number;
  }

  const prisma = getReadOnlyPrisma();
  // get top selling products
  if (url.searchParams.get('top') === 'true') {
    const products: TopSellingProducts =
      await prisma.$queryRaw`SELECT * FROM get_top_selling_products();`;
    const response = JSON.stringify(products, null, 2);
    return new Response(response, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  // get all products
  const products = await prisma.product.findMany();
  const response = JSON.stringify(products, null, 2);
  return new Response(response, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
