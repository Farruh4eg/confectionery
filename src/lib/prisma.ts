import { PrismaClient } from '@prisma/client';

let readOnlyPrisma: PrismaClient | undefined;
let adminPrisma: PrismaClient | undefined;

export const getReadOnlyPrisma = (): PrismaClient => {
  if (!readOnlyPrisma) {
    readOnlyPrisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_CLIENT as string,
        },
      },
    });
  }
  return readOnlyPrisma;
};

export const getAdminPrisma = (): PrismaClient => {
  if (!adminPrisma) {
    adminPrisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_ADMIN as string,
        },
      },
    });
  }
  return adminPrisma;
};
