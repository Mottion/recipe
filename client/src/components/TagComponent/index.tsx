import React from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";
import { TagProps } from "../../@types/dtos/TagProps";
import { styles } from "./style";

const TagComponent: React.FC<{tag: TagProps}> = ({tag}) => {
  return (
    <TouchableOpacity style={styles.tagWrapper}>
      <ImageBackground style={styles.tagBg} source={{uri: tag.image}}>
        <Text style={styles.tagTitle}>{tag.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default TagComponent