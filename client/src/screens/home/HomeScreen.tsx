import React, { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons';
import { TagProps } from "../../@types/dtos/TagProps";
import { useServer } from "../../context/ServerContext";

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<TagProps[]>([]);
  const server = useServer()
  
  useEffect(() => {
    getTags()
  }, [])

  const getTags = async () => {
    const response = await server.getTags();
    setTags(response)
  }

  return (
    <View style={styles.container} >
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
        {tags.map((tag) => (
          <TouchableOpacity key={tag.id} style={styles.tagWrapper}>
            <ImageBackground style={styles.tagBg} source={{uri: tag.image}}>
              <Text style={styles.tagTitle}>{tag.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;