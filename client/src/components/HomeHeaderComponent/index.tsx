import React, { useEffect, useState } from "react"
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useServer } from "../../context/ServerContext";
import { TagProps } from "../../@types/models/TagProps";
import { Feather } from '@expo/vector-icons';
import TagComponent from "../TagComponent";
import PageHeader from "../PageHeader";

const HomeHeaderComponent: React.FC = () => {
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