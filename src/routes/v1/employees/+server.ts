import { getAdminPrisma, getReadOnlyPrisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

const adminPrisma = getAdminPrisma();

interface Employee {
  lastname: string;
  firstname: string;
  patronymic: string;
  position: string;
}

export const POST: RequestHandler = async ({ request }) => {
  const body: Employee = await request.json();
  const { lastname, firstname, patronymic, position } = body;

  try {
    const employee = await adminPrisma.employee.create({
      data: {
        lastname,
        firstname,
        patronymic,
        id_position: +position,
      },
    });

    return new Response(JSON.stringify(employee, null, 2), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, message: e }, null, 2),
      {
        status: 500,
      }
    );
  }
};

export const PUT: RequestHandler = async ({ request }) => {
  const body: Employee = await request.json();
  return new Response();
};

export const DELETE: RequestHandler = async ({ request }) => {
  const body = await request.json();
  return new Response();
};

export const GET: RequestHandler = async ({ url }) => {
  const prisma = getReadOnlyPrisma();
  return new Response();
};
