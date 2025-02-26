import { Channel, Message } from "../types/types";

export const dummyChannels: Channel[] = [
  { id: 1, name: "general" },
  { id: 2, name: "random" },
  { id: 3, name: "dog-behavior" },
];

export const dummyMessages: Record<number, Message[]> = {
  1: [
    {
      id: "m1",
      sender: "Alice",
      content: "Hello, team!",
      timestamp: "2021-09-01T12:00:00",
    },
    {
      id: "m2",
      sender: "Bob",
      content: "Hi Alice, how are you?",
      timestamp: "2021-09-01T12:01:00",
    },
  ],
  2: [
    {
      id: "m3",
      sender: "Charlie",
      content: "Random chat here.",
      timestamp: "2021-09-01T12:02:00",
    },
  ],
  3: [
    {
      id: "m4",
      sender: "Diana",
      content: "I have a question about dog behavior.",
      timestamp: "2021-09-01T12:03:00",
    },
  ],
};
