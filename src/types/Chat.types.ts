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
  name: string;
}
