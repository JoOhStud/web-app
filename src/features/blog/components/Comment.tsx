import { useState } from "react";
import {
  Comment,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByPostIdQuery,
  useUpdateCommentMutation,
} from "../blogApi";
import { Box, Button, TextField, Typography } from "@mui/material";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const CommentComponent: React.FC<{
  comment: Comment;
  handleUpdateComment: (commentId: number, content: string) => void;
  handleDeleteComment: (commentId: number) => void;
}> = ({ comment, handleUpdateComment, handleDeleteComment }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const isAuthor = comment.author_id === currentUser.id;
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsByPostIdQuery(Number(comment.post_id), {
      skip: !comment.post_id,
    });
  const [createComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  return (
    <Box key={comment.id} sx={{ borderBottom: "1px solid #ccc", my: 2 }}>
      {editMode ? (
        <>
          <TextField
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <Button
            onClick={() => {
              setEditMode(false);
              handleUpdateComment(comment.id, editText);
            }}
          >
            Zapisz
          </Button>
          <Button onClick={() => setEditMode(false)}>Anuluj</Button>
        </>
      ) : (
        <>
          <Typography variant="body1">{comment.content}</Typography>
          {isAuthor && (
            <>
              <Button onClick={() => setEditMode(true)}>Edytuj</Button>
              <Button onClick={() => handleDeleteComment(comment.id)}>
                Usuń
              </Button>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CommentComponent;
