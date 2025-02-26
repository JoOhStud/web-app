import React, { useState } from "react";
import { PostData } from "../../../types/Posts.types";
import {
  PostsContainer,
  PostContainer,
  PostAuthor,
  PostContent,
  CommentsContainer,
  CommentRow,
  CommentAuthor,
  NewTextInput,
  SubmitButton,
  NewTextForm,
} from "./Conversations.styles";

interface ConversationsProps {
  posts: PostData[];
  onAddPost: (content: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

const Conversations: React.FC<ConversationsProps> = ({
  posts,
  onAddPost,
  onAddComment,
}) => {
  const [newPostContent, setNewPostContent] = useState("");
  const [newComment, setNewComment] = useState<{ [postId: string]: string }>(
    {}
  );

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      onAddPost(newPostContent);
      setNewPostContent("");
    }
  };

  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = newComment[postId];
    if (commentText && commentText.trim()) {
      onAddComment(postId, commentText);
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  return (
    <PostsContainer>
      {posts?.map((post) => (
        <PostContainer key={post.id}>
          <PostAuthor>{post.author}</PostAuthor>
          <PostContent>{post.content}</PostContent>
          <CommentsContainer>
            {post?.comments.map((comment) => (
              <CommentRow key={comment.id}>
                <CommentAuthor>{comment.author}: </CommentAuthor>
                <span>{comment.content}</span>
              </CommentRow>
            ))}
            <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
              <NewTextInput
                placeholder="Add a comment..."
                value={newComment[post.id] || ""}
                onChange={(e) =>
                  setNewComment({ ...newComment, [post.id]: e.target.value })
                }
                rows={1}
              />
              <SubmitButton type="submit">Comment</SubmitButton>
            </form>
          </CommentsContainer>
        </PostContainer>
      ))}
      <NewTextForm onSubmit={handlePostSubmit}>
        <NewTextInput
          placeholder="What's on your mind?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          rows={3}
        />
        <SubmitButton type="submit">Post</SubmitButton>
      </NewTextForm>
    </PostsContainer>
  );
};

export default Conversations;
