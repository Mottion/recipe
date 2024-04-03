import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import PageHeader from "../../components/PageHeader";
import { Octicons } from '@expo/vector-icons';
import { PageHeaderProps } from "../../@types/components/PageHeaderProps";
import CustomButton from "../../components/CustomButton/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../globalStyle/globalStyle";
import { useServer } from "../../context/ServerContext";
import { UserProps } from "../../@types/dtos/UserProps";

const ProfileScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const server = useServer();
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    getMyUser()
  }, [])

  async function getMyUser(){
    const response = await server.getMyUser();
    setUser(response);
  }

  const icons: PageHeaderProps["icons"] = [
    (size, color) => <Octicons onPress={() => {navigate("profileConfig")}} name="gear" size={size} color={color} />
  ]

  if(!user) return

  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      <PageHeader title="PROFILE" icons={icons} type="white" />
      <Image style={styles.image} source={user.image ? {uri: user.image} : require("../../../assets/user.jpg")}/>
      <Text style={styles.userName} >{user.name}</Text>
      <CustomButton onPress={() => {}} type="white" text="+ NEW RECIPE" />
      <View style={styles.line} />
    </LinearGradient>
  );
}

export default ProfileScreen;