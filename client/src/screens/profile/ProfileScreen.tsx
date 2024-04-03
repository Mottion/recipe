import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import PageHeader from "../../components/PageHeader";
import { Octicons } from '@expo/vector-icons';
import { PageHeaderProps } from "../../@types/components/PageHeaderProps";
import CustomButton from "../../components/CustomButton/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../globalStyle/globalStyle";
import { useServer } from "../../context/ServerContext";
import { UserProps } from "../../@types/dtos/UserProps";
import { RecipeProps } from "../../@types/dtos/RecipeProps";
import { RecipeComponent } from "../../components/RecipeComponent";

const ProfileScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const server = useServer();
  const [user, setUser] = useState<UserProps>();
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>();
  const take = 2;

  useEffect(() => {
    getMyUser();
    getRecipes(0);
  }, [])

  async function getMyUser(){
    const response = await server.getMyUser();
    setUser(response);
  }

  const getRecipes = async (skip: number) => {
    if(loading || lastIndex == skip) return;
    setLoading(true);
    const response = await server.getMyRecipes(skip, take);
    setRecipes([...recipes, ...response]);
    setLastIndex(recipes.length)
    setLoading(false)
  }

  const icons: PageHeaderProps["icons"] = [
    (size, color, index) => <Octicons key={index} onPress={() => {navigate("profileConfig")}} name="gear" size={size} color={color} />
  ]

  if(!user) return

  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      <PageHeader title="PROFILE" icons={icons} type="white" />
      <Image style={styles.image} source={user.image ? {uri: user.image} : require("../../../assets/user.jpg")}/>
      <Text style={styles.userName} >{user.name}</Text>
      <CustomButton onPress={() => {}} type="white" text="+ NEW RECIPE" />
      <View style={styles.line} />
      <FlatList 
        // style={styles.container}
        showsHorizontalScrollIndicator={false}
        data={recipes}
        renderItem={({item}) => {
          return <RecipeComponent recipe={item} />
        }}
        onEndReached={() => getRecipes(recipes.length)}
        onEndReachedThreshold={0.1}
        keyExtractor={item => item.id}
      />

    </LinearGradient>
  );
}

export default ProfileScreen;