import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { useServer } from "../../context/ServerContext";
import { RecipeProps } from "../../@types/models/RecipeProps";
import { RecipeComponent } from "../../components/RecipeComponent";
import HomeHeaderComponent from "../../components/HomeHeaderComponent";
import { useNavigation } from "@react-navigation/native";
import PageHeader from "../../components/PageHeader";

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>();
  const [search, setSearch] = useState("");
  const server = useServer();
  const take = 20;
  const navigation = useNavigation();
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', ({data}) => {
      const {routes} = data.state;
      if(routes[routes.length - 1].name == "home"){
        getRecipes(0)
      }
    });
    return () => {unsubscribe();};
  }, [navigation]);

  const getRecipes = async (skip: number) => {
    if(loading || lastIndex == skip) return;
    setLoading(true);
    const response = await server.getRecipes(skip, take);
    
    if(skip == 0) setRecipes([...response]);
    else setRecipes([...recipes, ...response]);

    setLastIndex(recipes.length)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <PageHeader title="HOME" type="purple" search={{state: search, setState: setSearch}} />
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={recipes}
        ListHeaderComponent={(<HomeHeaderComponent />)}
        renderItem={({item}) => {
          return <RecipeComponent recipe={item} />
        }}
        onEndReached={() => getRecipes(recipes.length)}
        onEndReachedThreshold={0.1}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default HomeScreen;