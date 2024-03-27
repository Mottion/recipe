import { Logger, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

function extendPrismaClient() {
  const logger = new Logger('Prisma');
  const prisma = new PrismaClient();
  return prisma.$extends({
    client: {
      async onModuleInit() {
        await this.$connect();
      }
    },
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = end - start;
          logger.verbose(`${model}.${operation} took ${Math.floor(time)}ms`);
          return result;
        }
      },
    },
    result: {
      recipe: {
        
      }
    }
  });
}

const ExtendedPrismaClient = class {
  constructor() {
    return extendPrismaClient();
  }
} as new () => ReturnType<typeof extendPrismaClient>;

@Injectable()
export class PrismaService extends ExtendedPrismaClient {}
