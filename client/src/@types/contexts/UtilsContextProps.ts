import { ImagePickerAsset } from "expo-image-picker";

export interface UtilsContextProps {
  uploadImage: (image: ImagePickerAsset | null) => Promise<string>; 
}