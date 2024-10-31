import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: undefined,
    password: faker.lorem.words(5),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: undefined,
    password: faker.lorem.words(5),
  };
}
export function fakeRecipe() {
  return {
    name: faker.person.fullName(),
    description: faker.lorem.words(5),
    ingredients: faker.lorem.words(5).split(' '),
    image: faker.image.avatar(),
    methodOfPreparation: faker.lorem.words(5),
    kcal: faker.number.int(),
  };
}
export function fakeRecipeComplete() {
  return {
    id: faker.string.uuid(),
    ownerId: faker.string.uuid(),
    tagId: faker.string.uuid(),
    name: faker.person.fullName(),
    description: faker.lorem.words(5),
    ingredients: faker.lorem.words(5).split(' '),
    image: faker.image.avatar(),
    methodOfPreparation: faker.lorem.words(5),
    kcal: faker.number.int(),
  };
}
export function fakeRating() {
  return {
    stars: faker.number.int(),
  };
}
export function fakeRatingComplete() {
  return {
    id: faker.string.uuid(),
    stars: faker.number.int(),
    ratedById: faker.string.uuid(),
    recipeId: faker.string.uuid(),
  };
}
export function fakeTag() {
  return {
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  };
}
export function fakeTagComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  };
}
export function fakeNotification() {
  return {
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
  };
}
export function fakeNotificationComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
    createAt: new Date(),
    user_id: faker.string.uuid(),
    readed: false,
  };
}
export function fakeMessage() {
  return {
    text: faker.lorem.words(5),
  };
}
export function fakeMessageComplete() {
  return {
    id: faker.string.uuid(),
    senderId: faker.string.uuid(),
    receiverId: faker.string.uuid(),
    text: faker.lorem.words(5),
    createdAt: new Date(),
    readed: false,
  };
}
