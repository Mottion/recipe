import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from "react-native";
import LoginScreen from "../screens/login/LoginScreen";
import SignupScreen from "../screens/signup/SignupScreen";

const {Screen, Navigator} = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="login" component={LoginScreen} />
      <Screen name="signup" component={SignupScreen} />
      <Screen name="forgottenPassword" component={View} />
    </Navigator>
  )
}

export default AuthStack