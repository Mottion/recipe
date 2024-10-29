import { NotificationProps } from "../models/NotificationProps";

export interface BellContextProps {
  notifications: NotificationProps[],
  setNotifications: (data: NotificationProps[]) => void;
}