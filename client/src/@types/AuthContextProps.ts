import { Unsubscribe, User } from "firebase/auth";
import { UserProps } from "./UserProps";

export interface AuthContextProps{
  user: User | null,
  login: (user: User) => void, 
  logOut: () => void,
  checkAuthentication: () => Unsubscribe,
}