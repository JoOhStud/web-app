export type CommentData = {
  id: string;
  author: string;
  content: string;
};

export type PostData = {
  id: string;
  author: string;
  content: string;
  comments: CommentData[];
};
