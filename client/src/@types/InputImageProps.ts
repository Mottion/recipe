import { ImagePickerAsset } from "expo-image-picker";

export interface InputImageProps {
  image: ImagePickerAsset | null,
  setImage: (uri: ImagePickerAsset) => void;
}