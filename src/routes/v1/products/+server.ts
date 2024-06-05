import { getAdminPrisma, getReadOnlyPrisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

interface BestSellingProducts {
  id: number;
  name: string;
  total_sold: number;
}

export const GET: RequestHandler = async ({ url }) => {
  const prisma = getReadOnlyPrisma();
  // get top selling products
  if (url.searchParams.get('top') === 'true') {
    const products: BestSellingProducts =
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
  const response = JSON.stringify(products);
  return new Response(response, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
