import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import {
  useGetPostByIdQuery,
  useGetCommentsByPostIdQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "../blogApi";
import {
  CircularProgress,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Comment } from "../blogApi";
import CommentComponent from "./Comment";

const PublicPostView: React.FC = () => {
  const { userId, postId } = useParams();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  // Pobieramy post
  const { data: post, isLoading: postLoading } = useGetPostByIdQuery(
    Number(postId),
    {
      skip: !postId,
    }
  );

  // Pobieramy komentarze
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsByPostIdQuery(Number(postId), {
      skip: !postId,
    });

  // Mutacje do komentarzy
  const [createComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  // Lokalny stan na dodawanie komentarza
  const [newCommentText, setNewCommentText] = useState("");

  if (postLoading || commentsLoading) {
    return <CircularProgress />;
  }
  if (!post) {
    return <div>Nie znaleziono posta...</div>;
  }

  const handleAddComment = async () => {
    if (!newCommentText.trim()) return;
    try {
      await createComment({
        postId: Number(postId),
        content: newCommentText,
      }).unwrap();
      setNewCommentText("");
    } catch (error) {
      console.error("Błąd dodawania komentarza:", error);
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    try {
      await updateComment({ commentId, content, postId: post.id }).unwrap();
    } catch (error) {
      console.error("Błąd edycji komentarza:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment({ commentId, postId: post.id }).unwrap();
    } catch (error) {
      console.error("Błąd usuwania komentarza:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{post.title}</Typography>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Sekcja komentarzy */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Komentarze:</Typography>

        {comments?.map((comment: Comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
          />
        ))}

        {/* Formularz dodawania nowego komentarza (dla zalogowanego usera) */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Dodaj komentarz"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddComment}>
            Dodaj
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PublicPostView;
