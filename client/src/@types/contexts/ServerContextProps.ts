import { RecipeProps } from "../dtos/RecipeProps";
import { TagProps } from "../dtos/TagProps";
import { UserProps } from "../dtos/UserProps";

export interface ServerContextProps{
  uploadImage: (file: FormData) => Promise<string>,
  userSignup: (user: UserProps) => Promise<string>,
  userLogin: (user: Omit<UserProps, "image" | "name">) => Promise<string>,
  getTags: () => Promise<TagProps[]>,
  getRecipes: (skip: number, take: number) => Promise<RecipeProps[]>
}