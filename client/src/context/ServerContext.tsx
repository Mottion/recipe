import React, { createContext, useContext } from "react";
import { ServerContextProps } from "../@types/ServerContextProps";
import { ContextProps } from "../@types/ContextProps";
import api from "../services/axiosConfig";
import { useAuth } from "./AuthContext";
import { ImagePickerAsset } from "expo-image-picker";
import { formToJSON } from "axios";

const ServerContext = createContext<ServerContextProps>({} as ServerContextProps)

export const ServerProvider: React.FC<ContextProps> = ({children}) => {
  const {user} = useAuth(); 

  async function uploadImage(file: FormData){
    try{
      const request = file;
      const {data} = await api.post("/user/uploadImage", request, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      return data;
    }catch(error){
      console.log(JSON.stringify(error))
    }
  }

  return (
    <ServerContext.Provider value={{
      uploadImage
    }}>
      {children}
    </ServerContext.Provider >
  );
}

export function useServer(){
  const context = useContext(ServerContext);
  return context;
}