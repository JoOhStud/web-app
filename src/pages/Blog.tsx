import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItemButton,
  Divider,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import {
  useGetPostsQuery,
  useGetUnpublishedPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  Post as BlogPost,
} from "../features/blog/blogApi";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: publishedPosts, isLoading: loadingPublished } =
    useGetPostsQuery();
  const { data: unpublishedPosts, isLoading: loadingUnpublished } =
    useGetUnpublishedPostsQuery();

  // Mutations
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  // If you want to delete, you'd also need useDeletePostMutation();

  // UI states
  const [openDialog, setOpenDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"published" | "unpublished">(
    "published"
  );

  // Form states (used for both create & edit)
  const [editMode, setEditMode] = useState<null | number>(null); // null => create new, or ID => editing that post
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");

  // Called when user clicks "New Post" or "Edit"
  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      // Editing
      setEditMode(post.id);
      setTitle(post.title);
      setShortDesc(post.short_description || "");
      setContent(post.content);
    } else {
      // Creating
      setEditMode(null);
      setTitle("");
      setShortDesc("");
      setContent("");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Submitting the form (create or update)
  const handleSubmitPost = async () => {
    if (editMode) {
      // Update existing post
      await updatePost({
        postId: editMode,
        data: {
          title,
          short_description: shortDesc,
          content,
          // Keep published state as it was (user might only be editing text)
          // but if you want a checkbox for "published", you can add it here
        },
      });
    } else {
      await createPost({ title, short_description: shortDesc, content });
    }
    setOpenDialog(false);
  };

  // "Publish" or "Unpublish" a post
  // If a post is unpublished, we set published=true; if it's published, set published=false
  const handleTogglePublish = async (post: BlogPost) => {
    await updatePost({
      postId: post.id,
      data: {
        title: post.title,
        short_description: post.short_description,
        content: post.content,
        published: !post.published, // flip the published state
      },
    });
  };

  // Rendering states
  if (loadingPublished || loadingUnpublished) {
    return <CircularProgress />;
  }

  // Decide which list of posts to show
  const postsToShow =
    viewMode === "published" ? publishedPosts : unpublishedPosts;

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* Sidebar with icons */}
      <Box
        sx={{
          width: "250px",
          bgcolor: "#f5f5f5",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          <ListItemButton onClick={() => setViewMode("published")}>
            <VisibilityIcon sx={{ mr: 1 }} />
            Opublikowane wpisy
          </ListItemButton>
          <ListItemButton onClick={() => setViewMode("unpublished")}>
            <VisibilityOffIcon sx={{ mr: 1 }} />
            Szkice
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          <ListItemButton onClick={() => navigate("/blog/new")}>
            <AddCircleOutlineIcon sx={{ mr: 1 }} />
            Dodaj wpis
          </ListItemButton>
        </List>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
        {location.pathname.startsWith("/blog/edit") ||
        location.pathname === "/blog/new" ? (
          <Outlet />
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {viewMode === "published" ? "Opublikowane wpisy" : "Szkice"}
            </Typography>

            {loadingPublished || loadingUnpublished ? (
              <CircularProgress />
            ) : (
              postsToShow?.map((post) => (
                <Card key={post.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      <Link
                        to={`/blog/${post.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {post.title}
                      </Link>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {post.short_description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => navigate(`/blog/edit/${post.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => navigate(`/blog/${post.id}`)}>
                      <CheckCircleIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default BlogPage;
