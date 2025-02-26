import { PostData } from "../types/Posts.types";

export const dummyPosts: Record<number, PostData[]> = {
  1: [
    {
      id: "p1",
      author: "Alice",
      content: "Welcome to the channel!",
      comments: [
        { id: "c1", author: "Bob", content: "Thanks, happy to be here." },
      ],
    },
  ],
  // add posts for other channels keyed by channel id
};
