import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from "../../globalStyle/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../services/firebaseConfig";
import { useNotify } from "../../context/NotifyContext";
import { useAuth } from "../../context/AuthContext";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  const {showNotify} = useNotify();
  const {login} = useAuth();
  
  function handleGoogleLogin(){

  }

  function handleLogin(){
    if(!email || !password){
      showNotify("some fields are empty!", "negative")
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      login(userCredential.user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const ErrorMessages: any = {
        "auth/invalid-email": "Email already in use!",
        "auth/invalid-credential": "invalid credentials!",
      }
      showNotify(ErrorMessages[errorCode] || "Internal Server Error", "negative")
    });
  }

  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title} >LOGIN</Text>
          <CustomInput label="Email" value={email} setValue={setEmail} placeholder="Enter with your email" />
          <CustomInput label="Password" value={password} setValue={setPassword} placeholder="Enter with your Password" />
          <TouchableOpacity style={styles.forgetWrapper}>
            <Text style={styles.forget}>Forgot your password?</Text>
          </TouchableOpacity>
          <CustomButton text="Login with Google" onPress={handleGoogleLogin} style="purple" />
          <CustomButton text="Login" onPress={handleLogin} style="white" />
        </View>
      </ScrollView>

      <Text onPress={() => {navigation.navigate("signup")}} style={styles.signup} >New here? Create an account</Text>

    </LinearGradient>
  );
}

export default LoginScreen