import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { AuthContextProps } from "../@types/AuthContextProps";
import { UserProps } from "../@types/UserProps";
import { ContextProps } from "../@types/ContextProps";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  
  return (
    <AuthContext.Provider value={{
      user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
};