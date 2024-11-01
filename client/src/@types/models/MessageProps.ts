export interface MessageProps {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: Date;
  readed: boolean;
}