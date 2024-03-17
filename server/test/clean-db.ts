import { PrismaService } from "src/prisma.service"

export const cleanDB = async (prisma: PrismaService) => {
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tag.deleteMany();
}