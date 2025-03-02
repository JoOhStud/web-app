import { ProfileData } from "../features/user/userApi";
import { User } from "./types";

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  participants: User[];
  partner: ProfileData | null;
  name: string;
  avatar: string;
}
