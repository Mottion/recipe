import React, { createContext, useContext } from "react";
import { ServerContextProps } from "../@types/ServerContextProps";
import { ContextProps } from "../@types/ContextProps";

const ServerContext = createContext<ServerContextProps>({})

export const ServerProvider: React.FC<ContextProps> = ({children}) => {

  return (
    <ServerContext.Provider value={{

    }}>
      {children}
    </ServerContext.Provider >
  );
}

export function useServer(){
  const context = useContext(ServerContext);
  return context;
}