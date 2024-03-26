import { Prisma } from "@prisma/client";

export const tags: Prisma.TagCreateManyInput[] = [
  {
    id: "e242bcc1-5b99-44c2-b4fe-ab50218b3c3b",
    image: "https://www.foodandwine.com/thmb/ckc6L6xKox0WfpfO6dMkuVGPQOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Angel-Food-Cake-with-Three-Berry-Compote-FT-RECIPE0323-541a780b871441e0ab14383ee38acc44.jpg",
    name: "dessert",
  },
  {
    id: "63484f66-0813-4ba4-94ee-2c252f9197cd",
    image: "https://img.freepik.com/free-photo/view-delicious-food-dish_23-2150777839.jpg",
    name: "cakes",
  },
  {
    id: "7e37eecc-badd-4fad-b733-f75beca76f02",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQrHiaVv37yOzH2HVTp65T6-Kf8vaEJAe1wkbz2L2l8w&s",
    name: "meat",
  },
  {
    id: "631abba0-2982-4a8c-b917-5e8ad77420b2",
    image: "https://img.freepik.com/fotos-gratis/vista-frontal-vegetal_140725-103355.jpg",
    name: "vegan",
  },
]