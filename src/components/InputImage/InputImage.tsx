import React, { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import * as ImagePicker from 'expo-image-picker';

const InputImage: React.FC = () => {
  const [image, setImage] = useState<string | null>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image style={styles.image} source={image ? {uri: image} : require("../../../assets/user.jpg")}/>
    </TouchableOpacity>
  );
}

export default InputImage;