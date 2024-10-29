import React, { createContext, useContext, useState } from "react";
import { UtilsContextProps } from "../@types/contexts/UtilsContextProps";
import { ContextProps } from "../@types/contexts/ContextProps";
import { ImagePickerAsset } from "expo-image-picker";
import { useServer } from "./ServerContext";

const UtilsContext = createContext<UtilsContextProps>({} as UtilsContextProps);

export const UtilsProvider: React.FC<ContextProps> = ({ children }) => {
  const server = useServer();
  
  async function uploadImage(image: string | undefined){
    const formData = new FormData();
    const extension = image?.split('.').pop();
    const data = {
      name: "name",
      uri: image,
      type: "image/"+ extension,
    }
    formData.append("file", data as any)

    const response = await server.uploadImage(formData);
    return response;
  }

  const formatDate = (input: Date) => {
    const date = new Date(input);
    const day =  String(date.getDay()).padStart(2, "0");
    const month = String(date.getMonth()).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`
  }

  return (
    <UtilsContext.Provider value={{
      uploadImage,
      formatDate
    }}>
      {children}
    </UtilsContext.Provider>
  );
}

export function useUtils(){
  const context = useContext(UtilsContext);
  return context;
}