import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from "../../globalStyle/globalStyle";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleGoogleLogin(){

  }

  function handleLogin(){

  }

  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      <View style={styles.contentWrapper}>
        <Text style={styles.title} >LOGIN</Text>
        <CustomInput label="Email" value={email} setValue={setEmail} placeholder="Enter with your email" />
        <CustomInput label="Password" value={password} setValue={setPassword} placeholder="Enter with your Password" />
        <Text style={styles.forget}>Forgot your password?</Text>
        <CustomButton text="Login with Google" onPress={handleGoogleLogin} style="purple" />
        <CustomButton text="Login" onPress={handleLogin} style="white" />
      </View>
      <Text style={styles.signup} >New here? Create an account</Text>
    </LinearGradient>
  );
}

export default LoginScreen