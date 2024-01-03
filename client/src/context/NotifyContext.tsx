import React, { createContext, useContext, useState } from "react";
import { NotifyContextProps } from "../@types/NotifyContextProps";
import { ContextProps } from "../@types/ContextProps";

const NotifyContext = createContext<NotifyContextProps>({} as NotifyContextProps);


export const NotifyProvider: React.FC<ContextProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotifyContextProps["type"]>("negative");


  function showNotify(message: string, type: "positive" | "negative") {
    setVisible(true);
    setMessage(message);
    setType(type);

    setTimeout(() =>{
      setVisible(false)
    }, 1500)
  } 
  
  return (
    <NotifyContext.Provider value={{
      visible,
      message,
      type,
      showNotify,
    }}>
      {children}
    </NotifyContext.Provider>
  );
}

export function useNotify(){
  const context = useContext(NotifyContext);
  return context;
}