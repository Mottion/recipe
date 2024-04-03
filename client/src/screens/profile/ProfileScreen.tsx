import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import PageHeader from "../../components/PageHeader";
import { Octicons } from '@expo/vector-icons';
import { PageHeaderProps } from "../../@types/components/PageHeaderProps";
import CustomButton from "../../components/CustomButton/CustomButton";

const ProfileScreen: React.FC = () => {
  const {navigate} = useNavigation();

  useEffect(() => {
    
  }, [])

  const icons: PageHeaderProps["icons"] = [{
    icon: <Octicons name="gear" size={24} color="black" />,
    cb: () => {navigate("profileConfig")}
  }]

  return (
    <View style={styles.container} >
      <PageHeader title="PROFILE" icons={icons} type="white" />
      <Image style={styles.image} source={require("../../../assets/user.jpg")}/>
      <Text style={styles.userName} ></Text>
      <CustomButton onPress={() => {}} style="white" text="+ NEW RECIPE" />
      <View style={styles.line} />
    </View>
  );
}

export default ProfileScreen;