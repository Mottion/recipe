import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { theme } from "../../globalStyle/globalStyle";
import { styles } from "./styles";
import { ScrollView, Text, View } from "react-native";
import InputImage from "../../components/InputImage/InputImage";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SignupScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation();

  function handleGoogleSignup(){

  }

  function handleSignup(){

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