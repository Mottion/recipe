import React, { useEffect, useState } from 'react';
import { styles } from "./styles";
import PageHeader from '../../components/PageHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../globalStyle/globalStyle';
import { RecipeProps } from '../../@types/models/RecipeProps';
import { useNavigation } from '@react-navigation/native';
import { useServer } from '../../context/ServerContext';
import { FlatList } from 'react-native';
import { RecipeComponent } from '../../components/RecipeComponent';

const SaveScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>();
  const navigation = useNavigation();
  const server = useServer();
  const take = 20;

  useEffect(() => {
    getFavorites(0)
  }, [navigation]);

  const getFavorites = async (skip: number) => {
    if(loading || lastIndex == skip) return;
    setLoading(true);
    const response = await server.getMyFavorites(skip, take);
    
    if(skip == 0) setRecipes([...response]);
    else setRecipes([...recipes, ...response]);

    setLastIndex(recipes.length)
    setLoading(false)
  }

  return (
    <LinearGradient
    colors={[theme.primary, theme.secondary]}
    style={styles.container}
    >
      <PageHeader title="SAVES" type="white"/>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={recipes}
        renderItem={({item}) => {
          return <RecipeComponent recipe={item} />
        }}
        onEndReached={() => getFavorites(recipes.length)}
        onEndReachedThreshold={0.1}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  )
}

export default SaveScreen