import { Prisma } from "@prisma/client";

export const tags: Prisma.TagCreateManyInput[] = [
  {
    id: "e242bcc1-5b99-44c2-b4fe-ab50218b3c3b",
    image: "https://assets.epicurious.com/photos/62b9e092ba4911ad9d7f93ac/1:1/w_3807,h_3807,c_limit/ChiffonCake_HERO_062322_36161.jpg",
    name: "tags 1",
  },
  {
    id: "63484f66-0813-4ba4-94ee-2c252f9197cd",
    image: "https://assets.epicurious.com/photos/62b9e092ba4911ad9d7f93ac/1:1/w_3807,h_3807,c_limit/ChiffonCake_HERO_062322_36161.jpg",
    name: "tags 2",
  },
]