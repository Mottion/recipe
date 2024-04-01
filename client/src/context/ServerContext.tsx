import React, { createContext, useContext } from "react";
import { ServerContextProps } from "../@types/contexts/ServerContextProps";
import { ContextProps } from "../@types/contexts/ContextProps";
import api from "../services/axiosConfig";
import { useAuth } from "./AuthContext";
import { useNotify } from "./NotifyContext";
import { UserProps } from "../@types/dtos/UserProps";
import { RecipeProps } from "../@types/dtos/RecipeProps";

const ServerContext = createContext<ServerContextProps>({} as ServerContextProps)

export const ServerProvider: React.FC<ContextProps> = ({children}) => {
  const {token, logOut} = useAuth();
  const {showNotify} = useNotify();

  // const requestWrapper: <T>() => Promise<T> = (cb: <T>() => Promise<T>) => {
  //   try{
  //     return cb();
  //   }catch(error: any){
  //     if(error.response.data.statusCode == 401){logOut()}
  //     showNotify(error.response.data.message, "negative")
  //   }
  // }

  async function uploadImage(file: FormData){
    try{
      const request = file;
      const {data} = await api.post("/user/uploadImage", request, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      return data;
    }catch(error: any){
      showNotify(error.response.data.message, "negative")
    }
  }

  async function userLogin(user: Omit<UserProps, "image" | "name">){
    try{
      const request = user;
      const {data} = await api.post("/auth/login", request)
      return data.access_token
    }catch(error: any){
      showNotify(error.response.data.message, "negative")
    }
  }

  async function userSignup(user: UserProps){
    try{
      const request = user;
      const {data} = await api.post("/user", request)
      return data.access_token
    }catch(error: any){
      showNotify(error.response.data.message, "negative")
    }
  }

  async function getTags(){
    try{
      const {data} = await api.get("/tag", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    }catch(error: any){
      showNotify(error.response.data.message, "negative")
    }
  }

  // const getRecipes = requestWrapper(async (skip: number, take: number) => {
  //   const {data} = await api.get("/recipe", {
  //     headers: { Authorization: `Bearer ${token}` },
  //     params: { skip, take }
  //   })
  //   return data as RecipeProps[]
  // })

  async function getRecipes(skip: number, take: number){
    const {data} = await api.get("/recipe", {
      headers: { Authorization: `Bearer ${token}` },
      params: { skip, take }
    })
    return data as RecipeProps[]
  }

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