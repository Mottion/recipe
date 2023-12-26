import React from "react";
import { TouchableOpacity } from "react-native";
import { CustomButtonProps } from "../../@types/CustomButtonProps";

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  style
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {text}
    </TouchableOpacity>
  );
}

export default CustomButton;