import React from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetPostByIdQuery } from "../features/blog/blogApi";

const PostPage: React.FC = () => {
  const { postId } = useParams();
  const { data: post, isLoading } = useGetPostByIdQuery(Number(postId));

  if (isLoading) return <CircularProgress />;
  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="caption" color="text.secondary">
        Utworzono: {post.created_at?.toString().slice(0, 19).replace("T", " ")}
      </Typography>
      <br />
      {post.updated_at && (
        <Typography variant="caption" color="text.secondary">
          Edytowano:{" "}
          {post.updated_at?.toString().slice(0, 19).replace("T", " ")}
        </Typography>
      )}
      <Typography variant="body2" sx={{ my: 2 }}>
        {post.short_description}
      </Typography>

      {/* Render the HTML content - dangerouslySetInnerHTML for CKEditor content */}
      <Box
        sx={{ border: "1px solid #ccc", p: 2 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {post.keywords && (
        <Typography variant="body2" color="text.secondary">
          Słowa kluczowe: {post.keywords}
        </Typography>
      )}
    </Box>
  );
};

export default PostPage;
