import React from "react";
import { RecipeProps } from "../../@types/models/RecipeProps";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { AntDesign } from '@expo/vector-icons';
import { theme } from "../../globalStyle/globalStyle";

export const RecipeComponent: React.FC<{recipe: RecipeProps}> = ({recipe}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: recipe.image}} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.author}>@{recipe.author}</Text>
          <Text style={styles.rating}>
            {recipe.rating}
            <AntDesign name="star" size={18} color={theme.yellow} />
          </Text>
        </View>
        <Text style={styles.infos}>{recipe.tag} - {recipe.kcal}</Text>
        <Text ellipsizeMode='tail' numberOfLines={3} style={styles.description}>{recipe.description}</Text>
      </View>
    </View>
  )
}