import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Routes = () => {
  const user = true;
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
};

export default Routes;