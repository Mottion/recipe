import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={() => {navigation.navigate("home")}}>
        <Text>Enviar 2</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;