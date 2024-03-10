import { Prisma } from "@prisma/client";

export const users: Prisma.UserCreateManyInput[] = [
  {
    id: "eecbf9a1-c234-46b3-8519-20630ceaac50",
    name: "usuario 1",
    email: "usuario1@gmail.com",
    image: "https://i.pinimg.com/564x/31/a3/47/31a347eb67b1a20add7f5e8e4074e0c4.jpg",
    password: "senha123",
  },
  {
    id: "e28fd859-dc9c-498c-b700-be183cf0dc2d",
    name: "usuario 2",
    email: "usuario2@gmail.com",
    image: "https://i.pinimg.com/564x/31/a3/47/31a347eb67b1a20add7f5e8e4074e0c4.jpg",
    password: "senha123",
  },
]