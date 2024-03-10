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
    rating: faker.number.float(),
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
    rating: faker.number.float(),
    methodOfPreparation: faker.lorem.words(5),
    kcal: faker.number.int(),
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
    image: faker.image.avatar(),
    name: faker.person.fullName(),
    description: faker.lorem.words(5),
  };
}
export function fakeNotificationComplete() {
  return {
    id: faker.string.uuid(),
    image: faker.image.avatar(),
    name: faker.person.fullName(),
    description: faker.lorem.words(5),
  };
}
export function fakeMessage() {
  return {
    text: faker.lorem.words(5),
    created: faker.number.int(),
  };
}
export function fakeMessageComplete() {
  return {
    id: faker.string.uuid(),
    senderId: faker.string.uuid(),
    receiverId: faker.string.uuid(),
    text: faker.lorem.words(5),
    created: faker.number.int(),
  };
}
