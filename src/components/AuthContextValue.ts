
import { createContext } from "react";

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});
