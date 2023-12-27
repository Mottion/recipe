export interface CustomButtonProps {
  text: string,
  onPress: (...args: any[]) => void;
  style: "purple" | "white"
}