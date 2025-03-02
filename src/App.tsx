import React, { useEffect } from "react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { useDispatch } from "react-redux";

import { AppContainer, MainContent } from "./App.styles";
import { theme } from "./theme";
import { GlobalStyles } from "./GlobalStyles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import Header from "./components/layout/Header";
import ChatComponent from "./features/chat/components/Chat";
import ChatToggleButton from "./features/chat/components/ChatToggleButton";
import { Route, Routes } from "react-router";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import { useGetCurrentUserQuery } from "./features/user/userApi";
import { setCurrentUser, setUserProfile } from "./features/user/userSlice";
import { Role } from "./types/types";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import AboutTab from "./features/user/components/AboutTab";
import BlogTab from "./features/user/components/BlogTab";
import CollaborationTab from "./features/user/components/CollaborationTab";
import ProfilePage from "./pages/ProfilePage";
import { setChatOpen } from "./features/chat/chatSlice";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import PostEditor from "./features/blog/components/PostEditor";

const App: React.FC = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.currentUser.token);
  const isChatOpen = useSelector((state: RootState) => state.chat.isOpen);
  const { data: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (auth.user) {
      const user = auth.user.profile;
      dispatch(
        setCurrentUser({
          id: user.sub,
          role: (user.userType as Role) ?? null,
          token: auth.user.access_token,
        })
      );
    }
  }, [auth.user, dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(setUserProfile(currentUser));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (
      !(
        hasAuthParams() ||
        auth.isAuthenticated ||
        auth.activeNavigator ||
        auth.isLoading
      )
    ) {
      auth.signinRedirect();
    }
  }, [auth]);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {auth.isLoading || (auth.isAuthenticated && !token) ? (
          <CircularProgress />
        ) : (
          <>
            {!auth.isAuthenticated && <div>Brak dostępu</div>}
            {auth.isAuthenticated && (
              <AppContainer>
                <Header />
                <MainContent>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/blog" element={<Blog />}>
                      <Route path="new" element={<PostEditor />} />
                      <Route path="edit/:postId" element={<PostEditor />} />
                    </Route>
                    <Route path="/blog/:postId" element={<Post />} />
                    <Route path="/user/:userId" element={<ProfilePage />}>
                      <Route index element={<AboutTab />} />
                      <Route path="about" element={<AboutTab />} />
                      <Route
                        path="collaboration"
                        element={<CollaborationTab />}
                      />
                      <Route path="blog" element={<BlogTab />} />
                    </Route>
                  </Routes>
                </MainContent>
                {isChatOpen && (
                  <ChatComponent onClose={() => dispatch(setChatOpen(false))} />
                )}
                {!isChatOpen && (
                  <ChatToggleButton
                    onToggle={() => dispatch(setChatOpen(!isChatOpen))}
                  />
                )}
              </AppContainer>
            )}
          </>
        )}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
