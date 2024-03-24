import React, { createContext, useContext } from "react";
import { ServerContextProps } from "../@types/contexts/ServerContextProps";
import { ContextProps } from "../@types/contexts/ContextProps";
import api from "../services/axiosConfig";
import { useAuth } from "./AuthContext";
import { useNotify } from "./NotifyContext";
import { UserProps } from "../@types/dtos/UserProps";

const ServerContext = createContext<ServerContextProps>({} as ServerContextProps)

export const ServerProvider: React.FC<ContextProps> = ({children}) => {
  const {token} = useAuth();
  const {showNotify} = useNotify();

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

  return (
    <ServerContext.Provider value={{
      uploadImage,
      userSignup,
      userLogin,
      getTags
    }}>
      {children}
    </ServerContext.Provider >
  );
}

export function useServer(){
  const context = useContext(ServerContext);
  return context;
}