import React, { createContext, useContext } from "react";
import { ServerContextProps } from "../@types/contexts/ServerContextProps";
import { ContextProps } from "../@types/contexts/ContextProps";
import api from "../services/axiosConfig";
import { useAuth } from "./AuthContext";
import { useNotify } from "./NotifyContext";
import { UserProps } from "../@types/dtos/UserProps";
import { RecipeProps } from "../@types/dtos/RecipeProps";
import { TagProps } from "../@types/dtos/TagProps";

const ServerContext = createContext<ServerContextProps>({} as ServerContextProps)

export const ServerProvider: React.FC<ContextProps> = ({children}) => {
  const {token, logOut} = useAuth();
  const {showNotify} = useNotify();

  const requestWrapper: <T>(cb: any) => Promise<T> = async (cb) => {
    try{
      return await cb()
    }catch(error: any){
      if(error.response.data.statusCode == 401){logOut()}
      showNotify(error.response.data.message, "negative")
    }
  }

  const uploadImage = (file: FormData) => requestWrapper<string>(async () => {
    const {data} = await api.post("/user/uploadImage", file, {
      headers: {'Content-Type': 'multipart/form-data',}
    })
    return data;
  })

  const userLogin = (user: Omit<UserProps, "image" | "name">) => requestWrapper<string>(async () => {
    const {data} = await api.post("/auth/login", user)
    return data.access_token
  })

  const userSignup = (user: UserProps) => requestWrapper<string>(async () => {
    const {data} = await api.post("/user", user)
    return data.access_token
  })

  const getTags = () => requestWrapper<TagProps[]>(async () => {
    const {data} = await api.get("/tag", {
      headers: {Authorization: `Bearer ${token}`}
    })
    return data
  })

  const getRecipes = (skip: number, take: number) => requestWrapper<RecipeProps[]>(async () => {
    const {data} = await api.get("/recipe", {
      headers: { Authorization: `Bearer ${token}` },
      params: { skip, take }
    })
    return data
  })

  return (
    <ServerContext.Provider value={{
      uploadImage,
      userSignup,
      userLogin,
      getTags,
      getRecipes
    }}>
      {children}
    </ServerContext.Provider >
  );
}

export function useServer(){
  const context = useContext(ServerContext);
  return context;
}