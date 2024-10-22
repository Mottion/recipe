import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomButtonProps } from "../../@types/components/CustomButtonProps";
import { styles } from "./styles";
import { theme } from "../../globalStyle/globalStyle";

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  type,
  style,
  icon
}) => {
  const primary = theme[type];
  const secondary = type == "white" ? theme.purple : theme.white

  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: primary, ...style}]} onPress={onPress}>
      {icon}
      <Text style={[styles.label, {color: secondary}]} >{text}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;