import { ReactElement } from "react";
import { ViewStyle } from "react-native";

export interface CustomButtonProps {
  text: string,
  onPress: (...args: any[]) => void;
  type: "purple" | "white" | "red",
  style?: ViewStyle,
  icon?: ReactElement<any, any>
}