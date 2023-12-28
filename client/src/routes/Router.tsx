import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useAuth } from "../context/AuthContext";

const Routes = () => {
  const {user} = useAuth();

  return (
    <NavigationContainer >
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
};

export default Routes;