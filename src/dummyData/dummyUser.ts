import { Role, User } from "../types/types";

export const dummyBehaviorist: User = {
  id: "1",
  email: "behaviorist@example.com",
  role: Role.Behaviorist,
  username: "Dr. Behavior",
};

export const dummyPetOwner: User = {
  id: "2",
  email: "petowner@example.com",
  role: Role.PetOwner,
  username: "Alice",
};
