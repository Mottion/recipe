import { ViewStyle } from "react-native";

export interface CustomInputProps {
  label: string,
  placeholder: string,
  value: string | undefined,
  setValue: (value: string) => void,
}