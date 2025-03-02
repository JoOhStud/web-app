import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Role } from "../../types/types";
import logo from "../../assets/logo4.png";
import Search from "../../features/search/components/Search";

const StyledAppBar = styled(AppBar)`
  width: 100%;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userRole = useSelector((state: RootState) => state.currentUser?.role);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    auth.signoutRedirect();
  };

  const handleProfileClicked = () => {
    handleUserMenuClose();
    navigate("/profile");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginRight: "20px",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "64px", marginRight: "8px" }}
          />
          <Typography
            variant="h6"
            component="div"
            fontFamily={"Tahoma"}
            letterSpacing={2}
          >
            Paw Connect
          </Typography>
        </Box>
        <Search />
        <Box sx={{ marginLeft: "auto", display: "flex", gap: 2 }}>
          {userRole === Role.Behaviorist && (
            <>
              <Button color="inherit" onClick={() => navigate("/blog")}>
                Blog
              </Button>
              <Button color="inherit" onClick={() => navigate("/oferta")}>
                Oferta
              </Button>
              <Button color="inherit" onClick={() => navigate("/wspolprace")}>
                Współprace
              </Button>
              <Button color="inherit" onClick={() => navigate("/kalendarz")}>
                Kalendarz
              </Button>
            </>
          )}
          {userRole === Role.PetOwner && (
            <>
              <Button color="inherit" onClick={() => navigate("/dog-profile")}>
                Dog Profile
              </Button>
              <Button color="inherit" onClick={() => navigate("/wspolprace")}>
                Współprace
              </Button>
              <Button color="inherit" onClick={() => navigate("/ulubione")}>
                Ulubione
              </Button>
            </>
          )}
        </Box>
        <IconButton color="inherit" onClick={handleUserMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={handleProfileClicked}>Pokaż profil</MenuItem>
          <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
