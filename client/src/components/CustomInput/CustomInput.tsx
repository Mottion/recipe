import React from "react";
import { Text, TextInput, View } from "react-native";
import { CustomInputProps } from "../../@types/CustomInputProps";
import { styles } from "./styles";

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  setValue
}) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  )
}

export default CustomInput;