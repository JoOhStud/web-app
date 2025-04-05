import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPostsQuery } from "../blogApi";
import { CircularProgress, Box, Typography } from "@mui/material";

const PublicUserBlog: React.FC = () => {
  const { userId } = useParams();
  // Jeśli userId jest wymagany, można dodać prostą walidację
  const { data: posts, isLoading } = useGetPostsQuery(
    { author_id: userId, published: true },
    {
      skip: !userId,
    }
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!posts || posts.length === 0) {
    return <Typography>Brak opublikowanych postów</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      {posts.map((post) => (
        <Box key={post.id} sx={{ my: 2 }}>
          <Link to={`/user/${userId}/blog/${post.id}`}>
            <Typography variant="h6">{post.title}</Typography>
          </Link>
          <Typography variant="caption">
            Data publikacji:{" "}
            {new Date(post.created_at || "").toLocaleDateString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PublicUserBlog;
