import { getAdminPrisma, getReadOnlyPrisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const prisma = getReadOnlyPrisma();
  const positions = await prisma.position.findMany({
    select: {
      id: true,
      position: true,
    },
  });
  const response = JSON.stringify(positions, null, 2);
  return new Response(response, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: RequestHandler = async ({ request }) => {
  const prisma = getAdminPrisma();
  const body = (await request.json()) as { position: string; salary: number };

  try {
    const position = await prisma.position.create({
      data: {
        position: body.position,
        salary: body.salary,
      },
    });

    return new Response(JSON.stringify(position, null, 2), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: e }), {
      status: 500,
    });
  }
};
