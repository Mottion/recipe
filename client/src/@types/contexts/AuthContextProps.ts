
export interface AuthContextProps{
  token: string | null,
  login: (user: string) => void, 
  logOut: () => void,
  checkAuthentication: () => void,
}