import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../context/AuthContext";

const HomeScreen: React.FC = () => {
  const {logOut} = useAuth();

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={logOut}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;