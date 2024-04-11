import { ImagePickerAsset } from "expo-image-picker";

export interface UtilsContextProps {
  uploadImage: (image: string | null) => Promise<string>; 
}