import { ImagePickerAsset } from "expo-image-picker";

export interface InputImageProps {
  image: string | undefined,
  setImage: (uri: string) => void;
}