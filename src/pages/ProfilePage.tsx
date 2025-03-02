import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useGetUserByIdQuery } from "../features/user/userApi";
import { selectChat, setChatOpen } from "../features/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrCreateChatMutation } from "../features/chat/chatApi";
import { RootState } from "../store";

function ProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const location = useLocation();
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserByIdQuery(userId || "");
  const [getOrCreateChat] = useGetOrCreateChatMutation();
  const currentUserId = useSelector((state: RootState) => state.currentUser.id);

  const handleOpenChat = async () => {
    if (!userData) return;
    try {
      const result = await getOrCreateChat({
        otherUserId: userData.id!,
      }).unwrap();
      const chat = result.chat;
      dispatch(setChatOpen(true));
      dispatch(selectChat(chat));
    } catch (err) {
      alert("Błąd tworzenia/pobierania czatu: " + err);
    }
  };

  let currentTab = 0;
  if (location.pathname.endsWith("about")) {
    currentTab = 0;
  } else if (location.pathname.endsWith("collaboration")) {
    currentTab = 1;
  } else if (location.pathname.endsWith("blog")) {
    currentTab = 2;
  }

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Nie udało się pobrać danych użytkownika.</div>;
  if (!userData) return null;

  return (
    <Container sx={{ mt: 3 }}>
      {/* Nagłówek */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar
          alt={userData.username || ""}
          // Jeśli masz zdjęcie w userData.picture, podstaw je tutaj:
          // src={userData.picture}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="h5" component="div">
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="body2">{userData.email}</Typography>
          {/* ewentualnie inne pola, np. location, opis, itp. */}
        </Box>
        <IconButton
          onClick={handleOpenChat}
          disabled={userData.id === currentUserId}
        >
          <ChatIcon />
        </IconButton>
      </Box>
      <Tabs value={currentTab}>
        <Tab label="O mnie" component={NavLink} to="about" />
        <Tab label="Współpraca" component={NavLink} to="collaboration" />
        <Tab label="Blog" component={NavLink} to="blog" />
      </Tabs>
      <Box mt={2}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default ProfilePage;
