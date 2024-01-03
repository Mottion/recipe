import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { theme } from "../../globalStyle/globalStyle";
import { styles } from "./styles";
import { ScrollView, Text, View, useAnimatedValue } from "react-native";
import InputImage from "../../components/InputImage/InputImage";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useNotify } from "../../context/NotifyContext";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import auth from "../../services/firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const SignupScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const {showNotify} = useNotify();
  const {login} = useAuth();

  function handleGoogleSignup(){

  }

  function handleSignup(){
    if(!name || !email || !password){
      showNotify("some fields are empty!", "negative")
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      login(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const ErrorMessages: any = {
        "auth/email-already-in-use": "Email already in use!",
        "auth/weak-password": "Password should be at least 6 characters!",
        "auth/invalid-email": "Invalid email!",
      }
      showNotify(ErrorMessages[errorCode] || "Internal Server Error", "negative")
    });
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