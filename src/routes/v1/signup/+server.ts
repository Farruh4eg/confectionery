import { getAdminPrisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
  const prisma = getAdminPrisma();
  const body = (await request.json()) as {
    username: string;
    password: string;
  };
  let { username, password } = body;

  const userExists = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (userExists) {
    return new Response(null, {
      status: 409,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const created = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return new Response(null, {
    status: 200,
  });
};
