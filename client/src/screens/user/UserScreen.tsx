import React, { useEffect, useState } from 'react';
import { styles } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../globalStyle/globalStyle';
import PageHeader from '../../components/PageHeader';
import { useServer } from '../../context/ServerContext';
import { useNavigation } from '@react-navigation/native';
import { UserProps } from '../../@types/models/UserProps';
import { RecipeProps } from '../../@types/models/RecipeProps';
import { FlatList, Image, Text, View } from 'react-native';
import { RecipeComponent } from '../../components/RecipeComponent';
import CustomButton from '../../components/CustomButton/CustomButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

const UserScreen: React.FC = () => {
  const server = useServer();
  const [user, setUser] = useState<UserProps>();
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>();
  const take = 20;
  const navigation = useNavigation();
  const { params }: any = navigation.getState().routes[navigation.getState().index];

  useEffect(() => {
    getUser();
  }, []);
  
  async function getUser(){
    const response = await server.getUser(params.id);
    if(response.IsMyProfile){
      navigation.navigate("profile");
    }
    setUser(response);
    getUserRecipes(0);
  }

  const getUserRecipes = async (skip: number) => {
    if(loading || lastIndex == skip) return;
    setLoading(true);
    const response = await server.getUserRecipes(params.id, skip, take);
    setRecipes([...recipes, ...response]);
    setLastIndex(recipes.length)
    setLoading(false)
  }

  const handleFollow = async () => {
    const response = await server.updateFollow(params.id, !user?.isFollower);

    if(response){
      getUser();
    }
  }

  
  if(!user) return
  const heartIcon = user.isFollower ? <AntDesign name="heart" size={26} color="black" /> : <AntDesign name="hearto" size={26} color="black" />;
  const messageIcon = <Entypo name="message" size={26} color="black" />;
  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      <PageHeader title="USER" type="white" />
      <Image style={styles.image} source={user.image ? {uri: user.image} : require("../../../assets/user.jpg")}/>
      <Text style={styles.userName} >{user.name}</Text>
      <CustomButton 
        onPress={handleFollow} 
        type="white" 
        text="FOLLOW" 
        icon={heartIcon}
      />
      <CustomButton 
        onPress={() => {navigation.navigate("newRecipe")}} 
        type="white" 
        text="MESSAGE" 
        icon={messageIcon}
      />
      <View style={styles.line} />
      <FlatList 
        showsHorizontalScrollIndicator={false}
        data={recipes}
        renderItem={({item}) => {
          return <RecipeComponent recipe={item} />
        }}
        onEndReached={() => getUserRecipes(recipes.length)}
        onEndReachedThreshold={0.1}
        keyExtractor={item => item.id}
      />

    </LinearGradient>
  )
}

export default UserScreen