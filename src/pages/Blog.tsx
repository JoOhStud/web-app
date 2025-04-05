import React from "react";
import { Box, List, ListItemButton, Divider } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

// Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

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
          <ListItemButton onClick={() => navigate("/blog")}>
            <VisibilityIcon sx={{ mr: 1 }} />
            Opublikowane wpisy
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/blog/drafts")}>
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
        <Outlet />
      </Box>
    </Box>
  );
};

export default BlogPage;
