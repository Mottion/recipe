import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { styles } from "./styles";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from "../../globalStyle/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { useNotify } from "../../context/NotifyContext";
import { useServer } from "../../context/ServerContext";
import { useAuth } from "../../context/AuthContext";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("adrianelizandro78@gmail.com");
  const [password, setPassword] = useState<string>("Senha123");
  const navigation = useNavigation();
  const {showNotify} = useNotify();
  const server = useServer();
  const {login} = useAuth();

  async function handleLogin(){
    if(!email || !password){
      showNotify("some fields are empty!", "negative")
      return;
    }

    const response = await server.userLogin({email, password})
    if(response){
      login(response);
    }
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
          <CustomButton text="Login with Google" onPress={() => {}} style="purple" />
          <CustomButton text="Login" onPress={handleLogin} style="white" />
        </View>
      </ScrollView>

      <Text onPress={() => {navigation.navigate("signup")}} style={styles.signup} >New here? Create an account</Text>

    </LinearGradient>
  );
}

export default LoginScreen