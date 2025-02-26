import { Role, User } from "../types/types";
export interface Chat {
  id: string;
  participants: User[];
}

export const dummyChats: Chat[] = [
  {
    id: "chat1",
    participants: [
      {
        id: "user1",
        username: "Alice",
        role: Role.PetOwner,
        email: "",
      },
      {
        id: "user2",
        username: "Bob",
        role: Role.Behaviorist,
        email: "",
      },
    ],
  },
];
