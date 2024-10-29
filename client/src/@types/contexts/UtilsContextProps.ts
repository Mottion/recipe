import { ImagePickerAsset } from "expo-image-picker";

export interface UtilsContextProps {
  uploadImage: (image: string | undefined) => Promise<string>; 
  formatDate: (input: Date) => string;
}