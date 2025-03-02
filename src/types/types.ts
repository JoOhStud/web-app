import { ProfileData } from "../features/user/userApi";

export type Channel = {
  id: number;
  name: string;
};

export type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
};

export type User = {
  id: string;
  role: Role | null;
  token: string | null;
  profile: ProfileData;
};

export enum Role {
  Behaviorist = "behaviorist",
  PetOwner = "pet_owner",
}

export enum SearchType {
  user = "user",
  post = "post",
}

export interface SearchHit {
  id: string;
  name: string;
  description: string;
  type: SearchType;
  location: string;
}
