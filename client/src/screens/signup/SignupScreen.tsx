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
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../services/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { useServer } from "../../context/ServerContext";
import { ImagePickerAsset } from "expo-image-picker";

const SignupScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      login(user);
      uploadImage();
    })
    .catch((error: AuthError) => {
      const errorCode = error.code;
      let errorMessage: string | undefined = getErrorMessage(errorCode);
      showNotify(errorMessage || "Internal Server Error", "negative")
    });
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
  }

  function getErrorMessage(errorCode: string){
    switch(errorCode){
      case "auth/email-already-in-use": return "Email already in use!";
      case "auth/weak-password": return "Password should be at least 6 characters!";
      case "auth/invalid-email": return "Invalid email!";
      default: return undefined;
    }
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