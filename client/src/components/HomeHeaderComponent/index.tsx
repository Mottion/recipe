import React, { useEffect, useState } from "react"
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useServer } from "../../context/ServerContext";
import { TagProps } from "../../@types/models/TagProps";
import { Feather } from '@expo/vector-icons';
import TagComponent from "../TagComponent";
import PageHeader from "../PageHeader";

const HomeHeaderComponent: React.FC = () => {
  const [search, setSearch] = useState("");
  const server = useServer()
  const [tags, setTags] = useState<TagProps[]>([]);
  
  useEffect(() => {
    getTags();
  }, [])

  const getTags = async () => {
    const response = await server.getTags();
    setTags(response)
  }

  return (
    <>
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
    </>
  )
}

export default HomeHeaderComponent;