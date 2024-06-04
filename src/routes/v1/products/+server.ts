import prisma from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

interface BestSellingProducts {
  id: number;
  name: string;
  total_sold: number;
}

export const GET: RequestHandler = async () => {
  const products: BestSellingProducts =
    await prisma.$queryRaw`SELECT * FROM get_top_selling_products();`;
  const response = JSON.stringify(products, null, 2);
  return new Response(response, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
