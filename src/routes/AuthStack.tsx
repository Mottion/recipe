import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from "react-native";

const {Screen, Navigator} = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Navigator>
      <Screen name="login" component={View} />
      <Screen name="signup" component={View} />
      <Screen name="forgottenPassword" component={View} />
    </Navigator>
  )
}

export default AuthStack