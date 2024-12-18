export interface MessagesProps {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: Date;
  readed: boolean;
  sender: {
    name: string;
    image: string;
  };
}