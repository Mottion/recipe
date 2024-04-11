import { CreateRecipeProps } from "../dtos/CreateRecipeProps";
import { RecipeProps } from "../models/RecipeProps";
import { TagProps } from "../models/TagProps";
import { UserProps } from "../models/UserProps";

export interface ServerContextProps{
  uploadImage: (file: FormData) => Promise<string>,
  userSignup: (user: UserProps) => Promise<string>,
  userLogin: (user: Omit<UserProps, "image" | "name">) => Promise<string>,
  getTags: () => Promise<TagProps[]>,
  getRecipes: (skip: number, take: number) => Promise<RecipeProps[]>,
  getMyRecipes: (skip: number, take: number) => Promise<RecipeProps[]>,
  getMyUser: () => Promise<UserProps>,
  createRecipe: (request: CreateRecipeProps) => Promise<RecipeProps>,
}