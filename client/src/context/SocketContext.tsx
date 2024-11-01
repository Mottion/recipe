import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ContextProps } from '../@types/contexts/ContextProps';
import { useAuth } from './AuthContext';
import { useServer } from './ServerContext';
import { NotificationProps } from '../@types/models/NotificationProps';
import { SocketContextProps } from '../@types/contexts/SocketContextProps';
import { MessagesProps } from '../@types/models/MessagesProps';
const io = require('socket.io-client');

const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);

export const SocketProvider: React.FC<ContextProps> = ({ children }) => {
  /* STATES FOR CONTROL NOTIFICATIONS */
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState<boolean>(false);
  const [lastIndexNotifications, setLastIndexNotifications] = useState<number>();
  
  /* STATES FOR CONTROL MESSAGES */
  const [messages, setMessages] = useState<MessagesProps[]>([]);

  const ws: React.MutableRefObject<WebSocket | null> = useRef(null);
  const server = useServer();
  const {token} = useAuth();
  
  useEffect(() => {
    onInit();

    return () => {
      if (ws.current) {
        ws.current.close();
        console.log("WebSocket connection closed");
      }
    };
  }, [token]);

  const onInit = async () => {
    if(!token) return;

    const responseNotifications = await getNotifications(0);
    const responseMessages = await getMessages();

    console.log("Initializing websocket...");
    const socket = io('ws://192.168.18.31:3000');

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
      socket.emit('register', {token});
    });
    
    socket.on('notification', (data: any) => {
      console.log(`Notificação recebida`);
      responseNotifications!.unshift(data);
      setNotifications([...responseNotifications!])
    });

    socket.on('message', (data: MessagesProps) => {
      console.log(`Mensagem recebida`);
      const index = responseMessages.findIndex((e) => {
        return data.senderId == e.senderId
      });
      
      if(index >= 0) {
        delete responseMessages[index];
      }
      responseMessages.unshift(data)

      setMessages([...responseMessages!])
    });
    
    socket.on('disconnect', () => {
      console.log('Desconectado do servidor');
    });

    return ws
  }

  const getMessages = async () => {
    const response = await server.getMessages();
    setMessages(response);

    return response
  }

  const getNotifications = async (skip?: number) => {
    if(loadingNotifications || lastIndexNotifications == skip) return;

    setLoadingNotifications(true);
    const response = await server.getNotifications(skip);

    if(skip == 0) setNotifications([...response]);
    else setNotifications([...notifications, ...response]);

    setLastIndexNotifications(notifications.length)
    setLoadingNotifications(false);
    return response
  } 

  return (
    <SocketContext.Provider value={{
      notifications,
      messages,
      setMessages
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket(){
const context = useContext(SocketContext);
return context;
}