export interface UserProps {
  name: string;
  email: string;
  password: string;
  image: string | undefined;
  isFollower?: boolean;
  IsMyProfile?: boolean;
}