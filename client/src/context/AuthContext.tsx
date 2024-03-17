import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContextProps } from "../@types/contexts/AuthContextProps";
import { ContextProps } from "../@types/contexts/ContextProps";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    loadFromStorage();
  }, [])

  async function loadFromStorage() {
    const storageData = await AsyncStorage.getItem("token");
    if (storageData) {
      const parsed = JSON.parse(JSON.stringify(storageData));
      setToken(parsed);
    }
  }

  function checkAuthentication(){
    console.log("logado")
  }

  async function login(auth: string){
    setToken(auth);
    await AsyncStorage.setItem('token', auth);
  }

  async function logOut(){
    setToken(null);
    AsyncStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{
      token,
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