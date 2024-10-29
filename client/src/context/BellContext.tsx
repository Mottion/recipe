import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ContextProps } from '../@types/contexts/ContextProps';
import { BellContextProps } from '../@types/contexts/BellContextProps';
import { useAuth } from './AuthContext';
import { useServer } from './ServerContext';
import { NotificationProps } from '../@types/models/NotificationProps';
const io = require('socket.io-client');

const BellContext = createContext<BellContextProps>({} as BellContextProps);

export const BellProvider: React.FC<ContextProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>();
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

    console.log("Initializing websocket...");
    const socket = io('ws://192.168.18.31:3000');

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
      socket.emit('register', {token});
    });
    
    socket.on('notification', (data: any) => {
      console.log(`Notificação recebida: ${data}`);
      const oldArray = notifications;
      setNotifications([...oldArray, data])
    });
    
    socket.on('disconnect', () => {
      console.log('Desconectado do servidor');
    });

    await getNotifications(0);

    return ws
  }

  const getNotifications = async (skip?: number) => {
    if(loading || lastIndex == skip) return;

    setLoading(true);
    const response = await server.getNotifications(skip);
    console.log("🚀 ~ getNotifications ~ response:", response)

    if(skip == 0) setNotifications([...response]);
    else setNotifications([...notifications, ...response]);

    setLastIndex(notifications.length)
    setLoading(false)
  } 

  return (
    <BellContext.Provider value={{
      notifications
    }}>
      {children}
    </BellContext.Provider>
  )
}

export function useBell(){
const context = useContext(BellContext);
return context;
}