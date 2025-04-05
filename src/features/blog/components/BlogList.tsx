import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Post,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "../blogApi";
import PublishIcon from "@mui/icons-material/Publish";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDraftView = location.pathname === "/blog/drafts";
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const userId = useSelector((state: RootState) => state.currentUser.id);

  const handlePublishPost = async (post: Post) => {
    await updatePost({
      postId: Number(post.id),
      data: { published: true },
    });
    navigate("/blog");
  };

  const handleDeletePost = async (post: Post) => {
    await deletePost(Number(post.id));
    navigate("/blog");
  };

  const { data: posts, isLoading } = useGetPostsQuery({
    author_id: userId,
    published: !isDraftView,
  });

  if (isLoading) return <CircularProgress />;
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {isDraftView ? "Nieopublikowane wpisy" : "Opublikowane wpisy"}
      </Typography>

      {posts?.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <Link to={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
                {post.title}
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {post.short_description}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => navigate(`/blog/edit/${post.id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/blog/${post.id}`)}>
              <VisibilityIcon />
            </IconButton>
            {isDraftView && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<PublishIcon />}
                onClick={() => {
                  handlePublishPost(post);
                }}
              >
                Opublikuj
              </Button>
            )}
            <IconButton
              onClick={() => {
                handleDeletePost(post);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default BlogList;
