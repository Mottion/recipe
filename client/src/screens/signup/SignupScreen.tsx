import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { theme } from "../../globalStyle/globalStyle";
import { styles } from "./styles";
import { ScrollView, Text, View } from "react-native";
import InputImage from "../../components/InputImage/InputImage";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useNotify } from "../../context/NotifyContext";
import { useAuth } from "../../context/AuthContext";
import { useServer } from "../../context/ServerContext";
import { ImagePickerAsset } from "expo-image-picker";
import { baseUrl } from "../../services/axiosConfig";

const SignupScreen: React.FC = () => {
  const [name, setName] = useState<string>("Adrian");
  const [email, setEmail] = useState<string>("adrianelizandro78@gmail.com");
  const [password, setPassword] = useState<string>("Senha123");
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const navigation = useNavigation();
  const {showNotify} = useNotify();
  const {login} = useAuth();
  const server = useServer();

  function handleGoogleSignup(){

  }

  async function handleSignup(){
    if(!name || !email || !password){
      showNotify("some fields are empty!", "negative")
      return;
    }

    let imagePath: string | null = null;
    if(image){
      imagePath = await uploadImage();
    }
    const response = await server.userSignup({
      name, email, password,
      image: imagePath ? `${baseUrl}/${imagePath}` : null
    });

    if(response){
      login(response);
    }

  }

  async function uploadImage(){
    const formData = new FormData();
    const extension = image?.uri.split('.').pop();
    const data = {
      name: "name",
      uri: image?.uri,
      type: "image/"+ extension,
    }
    formData.append("file", data as any)

    const response = await server.uploadImage(formData);
    return response;
  }

  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >

      <ScrollView style={styles.scroll}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title} >SIGNUP</Text>
          <InputImage image={image} setImage={setImage} />
          <CustomInput label="Name" value={name} setValue={setName} placeholder="Enter with your name" />
          <CustomInput label="Email" value={email} setValue={setEmail} placeholder="Enter with your email" />
          <CustomInput label="Password" value={password} setValue={setPassword} placeholder="Enter with your password" />
          <CustomButton text="Signup with Google" onPress={handleGoogleSignup} style="purple" />
          <CustomButton text="Signup" onPress={handleSignup} style="white" />
        </View>
      </ScrollView>

      <Text onPress={() => {navigation.navigate("login")}} style={styles.signup} >Already have an account? Login</Text>

    </LinearGradient>
  );
}

export default SignupScreen;