import { MessagesProps } from "../models/MessagesProps";
import { NotificationProps } from "../models/NotificationProps";

export interface SocketContextProps {
  notifications: NotificationProps[],
  messages: MessagesProps[];
}