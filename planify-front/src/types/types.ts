export interface Props {
  textColor?: string;
  background?: string;
}

export interface User {
  username: string;
  id: string;
}

export interface State {
  user: User | null;
  token: string | null;
}