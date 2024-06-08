import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создаем пользователей
  const user1 = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'password',
      role: 2,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      username: 'user',
      password: 'password',
    },
  });

  // Создаем должности
  const position1 = await prisma.position.create({
    data: {
      position: 'Менеджер',
      salary: 50000,
    },
  });
  const position2 = await prisma.position.create({
    data: {
      position: 'Рабочий',
      salary: 30000,
    },
  });

  // Создаем сотрудников
  const employee1 = await prisma.employee.create({
    data: {
      firstname: 'Иван',
      lastname: 'Иванов',
      patronymic: 'Иванович',
      id_position: position1.id,
    },
  });
  const employee2 = await prisma.employee.create({
    data: {
      firstname: 'Мария',
      lastname: 'Петрова',
      patronymic: 'Александровна',
      id_position: position2.id,
    },
  });

  // Создаем заводы
  const factory1 = await prisma.factory.create({
    data: {
      address: 'Улица Заводская, 123',
      num_employees: 10,
    },
  });

  // Связываем сотрудников с заводом
  await prisma.factory_Employee.create({
    data: {
      id_factory: factory1.id,
      id_employee: employee1.id,
    },
  });

  // Создаем пункты выдачи
  const pickupPoint1 = await prisma.pickup_Point.create({
    data: {
      address: 'Улица Выдачи, 456',
      working_hours: '9-18',
    },
  });

  // Связываем сотрудников с пунктом выдачи
  await prisma.pickup_Point_Employee.create({
    data: {
      id_pickup_point: pickupPoint1.id,
      id_employee: employee2.id,
    },
  });

  // Создаем продукты
  const product1 = await prisma.product.create({
    data: {
      name: 'Продукт1',
      price: 100,
      id_factory: factory1.id,
    },
  });

  // Создаем категории
  const category1 = await prisma.category.create({
    data: {
      category: 'Категория1',
    },
  });

  // Связываем продукты с категориями
  await prisma.product_Category.create({
    data: {
      id_product: product1.id,
      id_category: category1.id,
    },
  });

  // Связываем сотрудников с продуктами
  await prisma.product_Employee.create({
    data: {
      id_product: product1.id,
      id_employee: employee1.id,
    },
  });

  // Создаем клиентов
  const customer1 = await prisma.customer.create({
    data: {
      firstname: 'Алексей',
      lastname: 'Сидоров',
      patronymic: 'Петрович',
      phone: '1234567890',
    },
  });

  // Создаем заказы
  const order1 = await prisma.order.create({
    data: {
      id_customer: customer1.id,
      id_pickup_point: pickupPoint1.id,
      total_cost: 100,
      date: new Date(),
    },
  });

  // Связываем заказы с продуктами
  await prisma.order_Product.create({
    data: {
      id_order: order1.id,
      id_product: product1.id,
    },
  });

  console.log('Тестовые данные успешно созданы!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
