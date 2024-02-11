import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { styles } from "./styles";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from "../../globalStyle/globalStyle";
import { useNavigation } from "@react-navigation/native";
import {AuthError, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import auth, { googleProvider } from "../../services/firebaseConfig";
import { useNotify } from "../../context/NotifyContext";
import { useAuth } from "../../context/AuthContext";
import * as AuthSession from 'expo-auth-session';

const CLIENT_ID = "8577072164-qtkmgtlbola39fb06hefja7u06m7pa86.apps.googleusercontent.com";
const REDIRECT_URI = "https://auth.expo.io/@mottion/recipe";
const SCOPE = encodeURI("profile email");
const RESPONSE_TYPE = "tokens";

//?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
const redirectUri = AuthSession.makeRedirectUri({native: "https://auth.expo.io/@mottion/recipe"});
const discovery = {
  authorizationEndpoint: authUrl,
};

WebBrowser.maybeCompleteAuthSession();
import * as WebBrowser from 'expo-web-browser';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("adrianelizandro78@gmail.com");
  const [password, setPassword] = useState<string>("Senha123");
  const navigation = useNavigation();
  const {showNotify} = useNotify();
  const {login} = useAuth();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "8577072164-qtkmgtlbola39fb06hefja7u06m7pa86.apps.googleusercontent.com",
      redirectUri,
      responseType: 'token id_token',
      // responseType: AuthSession.ResponseType.Token,
      scopes: ['profile', 'email'],
    },
    discovery
  );

  useEffect(() => {
    if (response && response.type === 'success') {
      const token = response.params.access_token;
    }
  }, [response]);
  
  async function handleGoogleLogin(){
    promptAsync()
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
    .catch((error: AuthError) => {
      const errorCode = error.code;
      let ErrorMessages: string | undefined = getErrorMessage(errorCode);
      showNotify(ErrorMessages || "Internal Server Error", "negative");
    });
  }

  function getErrorMessage(errorCode: string){
    switch(errorCode){
      case "auth/invalid-email": return "Email already in use!";
      case "auth/invalid-credential": return "invalid credentials!";
      default: return undefined;
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
          <CustomButton text="Login with Google" onPress={handleGoogleLogin} style="purple" />
          <CustomButton text="Login" onPress={handleLogin} style="white" />
        </View>
      </ScrollView>

      <Text onPress={() => {navigation.navigate("signup")}} style={styles.signup} >New here? Create an account</Text>

    </LinearGradient>
  );
}

export default LoginScreen