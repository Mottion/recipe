import React, { createContext, useContext, useState } from "react";
import { UtilsContextProps } from "../@types/contexts/UtilsContextProps";
import { ContextProps } from "../@types/contexts/ContextProps";
import { ImagePickerAsset } from "expo-image-picker";
import { useServer } from "./ServerContext";

const UtilsContext = createContext<UtilsContextProps>({} as UtilsContextProps);

export const UtilsProvider: React.FC<ContextProps> = ({ children }) => {
  const server = useServer();
  
  async function uploadImage(image: ImagePickerAsset | null){
    const formData = new FormData();
    const extension = image?.uri.split('.').pop();
    const data = {
      name: "name",
      uri: image?.uri,
      type: "image/"+ extension,
    }
    formData.append("file", data as any)

    const response = await server.uploadImage(formData);
    return response;
  }

  return (
    <UtilsContext.Provider value={{
      uploadImage
    }}>
      {children}
    </UtilsContext.Provider>
  );
}

export function useUtils(){
  const context = useContext(UtilsContext);
  return context;
}