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
  email: string;
  role: Role;
  username: string;
};

export enum Role {
  Behaviorist = "behaviorist",
  PetOwner = "petOwner",
}
