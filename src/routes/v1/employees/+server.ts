import { getAdminPrisma, getReadOnlyPrisma } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

const adminPrisma = getAdminPrisma();

interface Employee {
  lastname: string;
  firstname: string;
  patronymic: string;
  id_position: string;
}

export const POST: RequestHandler = async ({ request }) => {
  const body: Employee = await request.json();
  const { lastname, firstname, patronymic, id_position } = body;
  console.log(body);
  try {
    const employee = await adminPrisma.employee.create({
      data: {
        lastname,
        firstname,
        patronymic,
        id_position: +id_position,
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

export const PUT: RequestHandler = async ({ url, request }) => {
  const id = url.searchParams.get('id');
  const body: Employee = await request.json();
  const { lastname, firstname, patronymic, id_position: position } = body;
  console.log({ position: position });
  if (id && body) {
    const editedEmployee = await adminPrisma.employee.update({
      where: {
        id: +id,
      },
      data: {
        lastname,
        firstname,
        patronymic,
        id_position: +position,
      },
    });

    return new Response(JSON.stringify(editedEmployee, null, 2), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  }

  return new Response(null, {
    status: 500,
  });
};

export const DELETE: RequestHandler = async ({ url }) => {
  const id = url.searchParams.get('id');
  if (id) {
    const deletedEmployee = await adminPrisma.employee.delete({
      where: {
        id: +id,
      },
    });
    return new Response(
      JSON.stringify(
        { success: true, message: 'Employee deleted successfully' },
        null,
        2
      ),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  }

  return new Response(null, {
    status: 500,
  });
};

export const GET: RequestHandler = async ({ url }) => {
  const prisma = getReadOnlyPrisma();
  const searchQuery = url.searchParams.get('q');

  if (!searchQuery) {
    const employees = await prisma.employee.findMany({
      include: {
        Position: {
          select: {
            position: true,
            id: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(employees, null, 2), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  }

  const employees = await prisma.employee.findMany({
    where: {
      OR: [
        {
          lastname: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        {
          patronymic: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        {
          firstname: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        {
          Position: {
            position: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
  });

  return new Response(JSON.stringify(employees, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  });
};
