import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { styles } from "./styles";
import { useServer } from "../../context/ServerContext";
import { RecipeProps } from "../../@types/dtos/RecipeProps";
import { RecipeComponent } from "../../components/RecipeComponent";
import HomeHeaderComponent from "../../components/HomeHeaderComponent";

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>();
  const server = useServer();
  const take = 2;
  
  useEffect(() => {
    getRecipes(0);
  }, [])

  const getRecipes = async (skip: number) => {
    if(loading || lastIndex == skip) return;
    setLoading(true);
    const response = await server.getRecipes(skip, take);
    setRecipes([...recipes, ...response]);
    setLastIndex(recipes.length)
    setLoading(false)
  }

  return (
    <FlatList 
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      data={recipes}
      ListHeaderComponent={(<HomeHeaderComponent />)}
      renderItem={({item}) => {
        return <RecipeComponent recipe={item} />
      }}
      onEndReached={() => getRecipes(recipes.length)}
      onEndReachedThreshold={0.1}
      keyExtractor={item => item.id}
    />
  );
}

export default HomeScreen;