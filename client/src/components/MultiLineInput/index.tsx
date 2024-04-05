import React from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { CustomInputProps } from "../../@types/components/CustomInputProps";

const MultiLineInput: React.FC<CustomInputProps> = ({
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
        multiline={true}
        underlineColorAndroid='transparent'
      />
    </View>
  )
}

export default MultiLineInput;
