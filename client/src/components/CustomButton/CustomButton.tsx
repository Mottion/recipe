import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { CustomButtonProps } from "../../@types/components/CustomButtonProps";
import styleType from "./styles";

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  style
}) => {
  const styles = styleType[style];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label} >{text}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;