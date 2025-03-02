import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../blogApi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostEditor: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(postId);
  const { data: post } = useGetPostByIdQuery(Number(postId), {
    skip: !isEditing,
  });
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  // Form state
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");

  // Load post data when editing
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setShortDesc(post.short_description || "");
      setContent(post.content);
    }
  }, [post]);

  // Handle saving the post
  const handleSavePost = async () => {
    if (isEditing) {
      await updatePost({
        postId: Number(postId),
        data: { title, short_description: shortDesc, content },
      });
    } else {
      await createPost({ title, short_description: shortDesc, content });
    }
    navigate("/blog");
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        // height: "100%",
        overflow: "hidden",
        p: 3,
      }}
    >
      <Typography variant="h4">{isEditing ? "Edycja" : "Nowy wpis"}</Typography>
      <TextField
        label="Tytuł"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ my: 1 }}
      />
      <TextField
        label="Krótki opis"
        fullWidth
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
        sx={{ my: 1 }}
      />

      <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
        <CKEditor
          activeClass="p10"
          editor={ClassicEditor}
          data={content}
          onChange={(event: any, editor: any) => setContent(editor.getData())}
          onBlur={() => {}}
          config={{
            height: "400px",
          }}
        />
      </Box>
      <Button onClick={handleSavePost} variant="contained" sx={{ mt: 2 }}>
        {isEditing ? "Zapisz zmiany" : "Zapisz"}
      </Button>
    </Box>
  );
};

export default PostEditor;
