import { PrismaClient } from '@prisma/client'
import { recipes } from '../src/mocks/seeds/recipes.seed';
import { tags } from '../src/mocks/seeds/tags.seed';
import { users } from '../src/mocks/seeds/users.seed';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({data: users})
  await prisma.tag.createMany({data: tags})
  await prisma.recipe.createMany({data: recipes})
}

main()  
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})