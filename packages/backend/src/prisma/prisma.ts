import { PrismaClient } from '@prisma/client';

class PrismaService {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({
      errorFormat: 'minimal',
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
  }
}

export const prismaService = new PrismaService();
