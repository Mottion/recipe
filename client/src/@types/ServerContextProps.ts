
export interface ServerContextProps{
  uploadImage: (file: FormData) => Promise<string>,
}