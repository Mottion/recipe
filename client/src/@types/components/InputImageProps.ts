import { ImagePickerAsset } from "expo-image-picker";

export interface InputImageProps {
  image: string | null,
  setImage: (uri: string) => void;
}