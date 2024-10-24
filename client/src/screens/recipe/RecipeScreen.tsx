import { Image, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import PageHeader from "../../components/PageHeader";
import { Link, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useServer } from "../../context/ServerContext";
import { RecipeProps } from "../../@types/models/RecipeProps";
import { AntDesign } from '@expo/vector-icons';
import { theme } from "../../globalStyle/globalStyle";
import Fontisto from '@expo/vector-icons/Fontisto';
import DescriptionComponent from "../../components/DescriptionComponent";
import IngredientComponent from "../../components/IngredientComponent";
import { useNotify } from "../../context/NotifyContext";

const RecipeScreen: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeProps>({} as RecipeProps);
  
  const navigation = useNavigation();
  const { params } = navigation.getState().routes[navigation.getState().index];
  const server = useServer();
  const {showNotify} = useNotify();
  
  useEffect(() => {
    getRecipe(params?.id);
  }, [])

  async function getRecipe(id: string | undefined){
    if(id){
      const response = await server.getRecipe(id);
      setRecipe(response);
    }
  }

  const updateFavorite = async () => {
    const response = await server.updateFavorite(recipe.id, !recipe.isFavorite);
    setRecipe(response);
  }

  if(!Object.keys(recipe).length) return;
  return (
    <View style={styles.container}>
      <PageHeader title="RECIPE" type="purple"/>

      <ScrollView style={styles.scroll}>
        {/* RECIPE HEADER */}
        <View style={styles.recipe}>
          <Image style={styles.image} source={{uri: recipe.image}} />
          <View style={styles.details}>
            <View style={styles.header}>
              <Text style={styles.name}>{recipe.name}</Text>
              <Text onPress={() => {navigation.navigate("user", {id: recipe.authorId})}} style={styles.author}>@{recipe.author}</Text>
              <Text style={styles.rating}>
                {recipe.rating}
                <AntDesign name="star" size={25} color={theme.yellow} />
              </Text>
              <TouchableOpacity style={styles.rating}>
                <Fontisto onPress={updateFavorite} name="favorite" size={25} color={recipe.isFavorite ? theme.yellow : theme.gray} />
              </TouchableOpacity>
            </View>
            <Text style={styles.infos}>{recipe.tag} - {recipe.kcal} kcal</Text>
          </View>
        </View>

        <DescriptionComponent title="Description" description={recipe.description} />
        <IngredientComponent title="Ingredients" ingredients={recipe.ingredients} />
        <DescriptionComponent title="Method of Preparation" description={recipe.methodOfPreparation} />
        </ScrollView>
    </View>
  )
}

export default RecipeScreen;