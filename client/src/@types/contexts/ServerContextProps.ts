import { CreateRecipeProps } from "../dtos/CreateRecipeProps";
import { UpdateUserProps } from "../dtos/UpdateUserProps";
import { MessagesProps } from "../models/MessagesProps";
import { NotificationProps } from "../models/NotificationProps";
import { RecipeProps } from "../models/RecipeProps";
import { TagProps } from "../models/TagProps";
import { UserProps } from "../models/UserProps";

export interface ServerContextProps{
  uploadImage: (file: FormData) => Promise<string>,
  userSignup: (user: UserProps) => Promise<string>,
  userLogin: (user: Omit<UserProps, "image" | "name">) => Promise<string>,
  getTags: () => Promise<TagProps[]>,
  getRecipes: (skip: number, take: number) => Promise<RecipeProps[]>,
  getRecipe: (id: string) => Promise<RecipeProps>,
  updateFavorite: (id: string, newState: boolean) => Promise<RecipeProps>,
  getMyFavorites: (skip: number, take: number) => Promise<RecipeProps[]>,
  getMyRecipes: (skip: number, take: number) => Promise<RecipeProps[]>,
  getUserRecipes: (id: string, skip: number, take: number) => Promise<RecipeProps[]>,
  getMyUser: () => Promise<UserProps>,
  getUser: (tag: string) => Promise<UserProps>,
  createRecipe: (request: CreateRecipeProps) => Promise<RecipeProps>,
  updateUser: (request: UpdateUserProps) => Promise<UserProps>;
  updateFollow: (id: string, newState: boolean) => Promise<UserProps>;
  getNotifications: (skip?: number) => Promise<NotificationProps[]>;
  readNotification: () => Promise<{count: number}>,
  getMessages: (skip?: number) => Promise<MessagesProps[]>
}