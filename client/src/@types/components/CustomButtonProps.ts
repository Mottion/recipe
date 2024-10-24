import { ReactElement } from "react";
import { ViewStyle } from "react-native";

export interface CustomButtonProps {
  text: string,
  onPress: (...args: any[]) => void;
  type: "purple" | "white",
  style?: ViewStyle,
  icon?: ReactElement<any, any>
}