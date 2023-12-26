import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleGoogleLogin(){

  }

  function handleLogin(){

  }

  return (
    <View style={styles.container}>
      <Text style={styles.container}>LOGIN</Text>
      <CustomInput label="Email" value={email} setValue={setEmail} placeholder="Enter with your email" />
      <CustomInput label="Password" value={password} setValue={setPassword} placeholder="Enter with your Password" />
      <Text>Forgot your password?</Text>
      <CustomButton text="Login with Google" onPress={handleGoogleLogin} style="default" />
      <CustomButton text="Login" onPress={handleLogin} style="white" />
      <Text>New here? Create an account</Text>
    </View>
  );
}

export default LoginScreen