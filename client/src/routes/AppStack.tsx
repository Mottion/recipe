import React, { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/home/HomeScreen";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ProfileConfigScreen from "../screens/profileConfig/ProfileConfigScreen";
import NewRecipeScreen from "../screens/newRecipe/NewRecipeScreen";
import FooterComponent from "../components/FooterComponent";

import { theme } from "../globalStyle/globalStyle";
import RecipeScreen from "../screens/recipe/RecipeScreen";
import UserScreen from "../screens/user/UserScreen";
import SaveScreen from "../screens/save/SaveScreen";

const {Screen, Navigator} = createNativeStackNavigator();

const AppStack = () => {
  const navigation = useNavigation();
  const {checkAuthentication} = useAuth();
  
  useEffect(() => {
    // Screens in AppStack require authentication, so whenever a new screen is rendered, we validate the user's authentication state.
    const unsubscribe = navigation.addListener('state', checkAuthentication);
    return () => {unsubscribe();};
  }, [navigation]);

  return (
    <>
      <Navigator screenOptions={{headerShown: false, contentStyle: {backgroundColor: theme.white}}}>
        <Screen name="home" component={HomeScreen} />
        <Screen name="profile" component={ProfileScreen} />
        <Screen name="profileConfig" component={ProfileConfigScreen} />
        <Screen name="newRecipe" component={NewRecipeScreen} />
        <Screen name="recipe" component={RecipeScreen} />
        <Screen name="user" component={UserScreen} />
        <Screen name="save" component={SaveScreen} />
      </Navigator>
      <FooterComponent />
    </>
  )
}

export default AppStack