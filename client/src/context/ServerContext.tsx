import React, { createContext, useContext } from "react";
import { ServerContextProps } from "../@types/contexts/ServerContextProps";
import { ContextProps } from "../@types/contexts/ContextProps";
import api from "../services/axiosConfig";
import { useAuth } from "./AuthContext";
import { useNotify } from "./NotifyContext";
import { UserProps } from "../@types/models/UserProps";
import { RecipeProps } from "../@types/models/RecipeProps";
import { TagProps } from "../@types/models/TagProps";
import { CreateRecipeProps } from "../@types/dtos/CreateRecipeProps";
import { UpdateUserProps } from "../@types/dtos/UpdateUserProps";
import { NotificationProps } from "../@types/models/NotificationProps";
import { MessagesProps } from "../@types/models/MessagesProps";
import { MessageProps } from "../@types/models/MessageProps";

const ServerContext = createContext<ServerContextProps>({} as ServerContextProps)

export const ServerProvider: React.FC<ContextProps> = ({children}) => {
  const {token, logOut} = useAuth();
  const {showNotify} = useNotify();

  const requestWrapper: <T>(cb: any) => Promise<T> = async (cb) => {
    try{
      return await cb()
    }catch(error: any){
      if(error.response.data.statusCode == 401){logOut()}
      showNotify(error.response.data.message, "negative")
    }
  }

  const uploadImage = (file: FormData) => requestWrapper<string>(async () => {
    const {data} = await api.post("/user/uploadImage", file, {
      headers: {'Content-Type': 'multipart/form-data',}
    })
    return data;
  })

  const userLogin = (user: Omit<UserProps, "image" | "name">) => requestWrapper<string>(async () => {
    const {data} = await api.post("/auth/login", user)
    return data.access_token
  })

  const userSignup = (user: UserProps) => requestWrapper<string>(async () => {
    const {data} = await api.post("/user", user)
    return data.access_token
  })

  const getTags = () => requestWrapper<TagProps[]>(async () => {
    const {data} = await api.get("/tag", {
      headers: {Authorization: `Bearer ${token}`}
    })
    return data
  })

  const getRecipes = (skip: number, take: number) => requestWrapper<RecipeProps[]>(async () => {
    const {data} = await api.get("/recipe", {
      headers: { Authorization: `Bearer ${token}` },
      params: { skip, take }
    })
    return data
  })


  const getMyRecipes = (skip: number, take: number) => requestWrapper<RecipeProps[]>(async () => {
    const {data} = await api.get("/recipe/user", {
      headers: { Authorization: `Bearer ${token}` },
      params: { skip, take }
    })
    return data
  })

  const getUserRecipes = (id: string, skip: number, take: number) => requestWrapper<RecipeProps[]>(async () => {
    const {data} = await api.get(`/recipe/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { skip, take }
    })
    return data
  })

  const getRecipe = (id: string) => requestWrapper<RecipeProps>(async () => {
    const {data} = await api.get(`recipe/${id}`,{
      headers: { Authorization: `Bearer ${token}`}
    })
    return data;
  })

  const updateFavorite = (id: string, newState: boolean) => requestWrapper<RecipeProps>(async () => {
    const request = {id, newState};
    const {data} = await api.patch(
      `recipe/favorite`,
      request,
      {headers: { Authorization: `Bearer ${token}`}}
    )
    return data;
  })

  const getMyFavorites = (skip: number, take: number) => requestWrapper<RecipeProps[]>(async () => {
    const {data} = await api.get(`recipe/favorites`,{
      headers: { Authorization: `Bearer ${token}`},
      params: { skip, take },
    })
    return data;
  })

  const createRecipe = (request: CreateRecipeProps) => requestWrapper<RecipeProps>(async () => {
    const {data} = await api.post(
      "/recipe", 
      request, 
      {headers: { Authorization: `Bearer ${token}` }}
    );
    return data
  })

  const getMyUser = async () => {
    const {data} = await api.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  }

  const getUser = async (tag: string) => {
    const {data} = await api.get(`/user/${tag}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  }


  const updateUser = async (request: UpdateUserProps) => requestWrapper<UserProps>(async () => {
    const {data} = await api.patch(
      "/user", 
      request, 
      {headers: { Authorization: `Bearer ${token}` }}
    )
    return data
  })

  const updateFollow = async (id: string, newState: boolean) => requestWrapper<UserProps>(async () => {
    const request = {id, newState};
    const {data} = await api.patch(
      "/user/follow", 
      request, 
      {headers: { Authorization: `Bearer ${token}` }}
    )
    return data
  })

  const getNotifications = async (skip?: number) => requestWrapper<NotificationProps[]>(async () => {
    const {data} = await api.get(`/notifications`, {
      params: {skip},
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  })

  const readNotification = async () => requestWrapper<{count: number}>(async () => {
    const {data} = await api.post(`/notifications/read`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  })

  const getMessages = async (skip?: number) => requestWrapper<MessagesProps[]>(async () => {
    const {data} = await api.get(`/message`, {
      params: {skip},
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  })

  const readMessages = async (userId: string) => requestWrapper<{count: number}>(async () => {
    const {data} = await api.post(`/message/read/${userId}`, 
      null,
      {headers: { Authorization: `Bearer ${token}` }}
    );
    return data;
  })

  const getUserMessages = async (userId: string, skip: number) => requestWrapper<MessageProps[]>(async () => {
    const {data} = await api.get(`/message/${userId}`,{
      params: {skip},
      headers: { Authorization: `Bearer ${token}` }
    }
    );
    return data;
  })


  const createMessage = async (text: string, receiver: string) => requestWrapper<MessageProps>(async () => {
    const request = {text, receiver};
    const {data} = await api.post(`/message`,
      request,
      {headers: { Authorization: `Bearer ${token}` }}
    );
    return data;
  })


  return (
    <ServerContext.Provider value={{
      uploadImage,
      userSignup,
      userLogin,
      getTags,
      getRecipes,
      getRecipe,
      updateFavorite,
      getMyFavorites,
      getMyUser,
      getUser,
      getMyRecipes,
      getUserRecipes,
      createRecipe,
      updateUser,
      updateFollow,
      getNotifications,
      readNotification,
      getMessages,
      readMessages,
      getUserMessages,
      createMessage
    }}>
      {children}
    </ServerContext.Provider >
  );
}

export function useServer(){
  const context = useContext(ServerContext);
  return context;
}