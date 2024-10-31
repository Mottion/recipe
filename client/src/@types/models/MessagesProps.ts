export interface MessagesProps {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: Date;
  readed: false;
  sender: {
    name: string;
    image: string;
  };
}