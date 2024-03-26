import { Prisma } from "@prisma/client";
import { users } from "./users.seed";
import { tags } from "./tags.seed";

export const recipes: Prisma.RecipeCreateManyInput[] = [
  {
    id: "f6b58f83-d11d-42f8-b34a-760d844e23dc",
    ownerId: users[0].id,
    tagId: tags[0].id,
    name: "cake",
    description: "fringilla, nisi ac venenatis convallis, odio lectus semper nibh, sit amet aliquet metus orci at dui. Donec pharetra cursus nunc, ac dapibus nulla ullamcorper id. Donec ac tempus",
    ingredients: ["blandit sit amet felis", "Vestibulum ante ipsum"],
    image: "https://hips.hearstapps.com/hmg-prod/images/chocolate-cake-index-64b83bce2df26.jpg",
    rating: [5, 4, 3],
    methodOfPreparation: "Etiam gravida lorem placerat rhoncus pellentesque. Pellentesque id urna vitae odio aliquet accumsan. Phasellus massa augue, auctor sed gravida vitae",
    kcal: 1988,
  },
  {
    id: "c2c438b2-523b-4236-b9bd-ff1ba44798b8",
    ownerId: users[0].id,
    tagId: tags[0].id,
    name: "cake 2",
    description: "fringilla, nisi ac venenatis convallis, odio lectus semper nibh, sit amet aliquet metus orci at dui. Donec pharetra cursus nunc, ac dapibus nulla ullamcorper id. Donec ac tempus",
    ingredients: ["blandit sit amet felis", "Vestibulum ante ipsum"],
    image: "https://i.pinimg.com/736x/42/3d/57/423d57c787bfb67361d868a3cacd4201.jpg",
    rating: [5, 4, 3],
    methodOfPreparation: "Etiam gravida lorem placerat rhoncus pellentesque. Pellentesque id urna vitae odio aliquet accumsan. Phasellus massa augue, auctor sed gravida vitae",
    kcal: 1988,
  },
]

