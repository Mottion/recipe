import { UserProps } from "../dtos/UserProps";

export interface ServerContextProps{
  uploadImage: (file: FormData) => Promise<string>,
  userSignup: (user: UserProps) => Promise<string>,
}