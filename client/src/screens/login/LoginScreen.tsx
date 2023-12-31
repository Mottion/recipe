import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from "../../globalStyle/globalStyle";
import { useNavigation } from "@react-navigation/native";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  
  function handleGoogleLogin(){

  }

  function handleLogin(){

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