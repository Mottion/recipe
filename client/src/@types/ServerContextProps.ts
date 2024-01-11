import { ImagePickerAsset } from "expo-image-picker";

export interface ServerContextProps{
  uploadImage: (file: FormData) => Promise<void>,
}