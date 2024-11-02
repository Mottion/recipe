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
import CustomButton from "../../components/CustomButton/CustomButton";

const RecipeScreen: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeProps>({} as RecipeProps);
  /* STATES FOR CONTROL MODAL*/
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(0);

  const navigation = useNavigation();
  const { params } = navigation.getState().routes[navigation.getState().index];
  const server = useServer();
  
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const renderStars = () => {
    const elements = [];
    for(let i = 0; i<5; i++){
      if(stars > i)
        elements.push(<AntDesign onPress={() => {setStars(i+1)}} name="star" size={32} color={theme.yellow} />)
      else
        elements.push(<AntDesign onPress={() => {setStars(i+1)}} name="staro" size={32} color={theme.yellow} />)
    }
    return elements;
  }

  const sendRating = async () => {
    const response = await server.rating(stars, recipe.id);
    if(response) getRecipe(params?.id);
    setIsModalOpen(false);
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
              <TouchableOpacity onPress={toggleModal} style={styles.rating}>
                <Text style={styles.number}>{recipe.rating}</Text>
                <AntDesign name="star" size={25} color={theme.yellow} />
              </TouchableOpacity>
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
        {isModalOpen && (
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.title}>
                Rating
              </Text>
              <View style={styles.stars}>
                {renderStars()}
              </View>
              <CustomButton text="send" type="purple" onPress={sendRating} />
              <CustomButton text="cancel" type="red" onPress={() => {setIsModalOpen(false)}} />
              </View>
          </View>
        )}
    </View>
  )
}

export default RecipeScreen;