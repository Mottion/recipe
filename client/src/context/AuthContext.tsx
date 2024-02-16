import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContextProps } from "../@types/AuthContextProps";
import { ContextProps } from "../@types/ContextProps";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  function checkAuthentication(){
    console.log("logado")
  }

  function login(user: User){
    setUser(user);
  }

  function logOut(){
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      checkAuthentication,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
};