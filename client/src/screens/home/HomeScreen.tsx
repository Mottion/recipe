import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons';
import { TagProps } from "../../@types/dtos/TagProps";
import { useServer } from "../../context/ServerContext";
import TagComponent from "../../components/TagComponent";
import { RecipeProps } from "../../@types/dtos/RecipeProps";
import { RecipeComponent } from "../../components/RecipeComponent";

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<TagProps[]>([]);
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const server = useServer()
  
  useEffect(() => {
    getTags();
    getRecipes();
  }, [])

  const getTags = async () => {
    const response = await server.getTags();
    setTags(response)
  }

  const getRecipes = async () => {
    const response = await server.getRecipes();
    for(let i = 0; i< 10; i++){
      response.push({...response[1], id: i.toString()});
    }
    setRecipes(response)
  }

  return (
    <ScrollView style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.title}>
          Home
        </Text>
        <Feather name="bell" size={28} color="black" />
      </View>
      <View style={styles.searchWrapper}>
        <TextInput 
          style={styles.search} 
          value={search} 
          onChangeText={setSearch} 
          placeholder="Search"
          placeholderTextColor="#6d6d6d"
        />
        <Feather style={styles.filter} name="filter" size={24} />
      </View>
      <TouchableOpacity style={styles.adSpace}>
        <Image style={styles.ads} source={require("../../../assets/ads.png")} />
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tags}>
        {tags.map((tag) => <TagComponent key={tag.id} tag={tag} />)}
      </ScrollView>
      <FlatList 
        showsHorizontalScrollIndicator={false}
        data={recipes}
        renderItem={({item}) => <RecipeComponent recipe={item} />}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

export default HomeScreen;