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
import CollaborationTab from "./features/user/components/CollaborationTab";
import ProfilePage from "./pages/ProfilePage";
import { setChatOpen } from "./features/chat/chatSlice";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import PostEditor from "./features/blog/components/PostEditor";
import BlogList from "./features/blog/components/BlogList";
import Footer from "./components/layout/Footer";
import CookiesPage from "./pages/Cookies";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsPage from "./pages/Terms";
import CookieBanner from "./components/layout/CookieBanner";
import PublicPostView from "./features/blog/components/PublicPostView";
import PublicUserBlog from "./features/blog/components/PublicUserBlog";
import { ChannelsListPage } from "./pages/Channels";
import { ChannelDetailsPage } from "./pages/ChannelDetails";
import { DogPage } from "./pages/DogPage";

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
                <CookieBanner />
                <MainContent>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route
                      path="/oferta"
                      element={<CollaborationTab isEditing={true} />}
                    />
                    <Route path="/wspolprace" element={<ChannelsListPage />} />
                    <Route
                      path="/wspolprace/:channelId"
                      element={<ChannelDetailsPage />}
                    />
                    <Route path="/blog" element={<Blog />}>
                      <Route index element={<BlogList />} />
                      <Route path="drafts" element={<BlogList />} />
                      <Route path="new" element={<PostEditor />} />
                      <Route path="edit/:postId" element={<PostEditor />} />
                      <Route path="/blog/:postId" element={<Post />} />
                    </Route>
                    <Route path="/user/:userId" element={<ProfilePage />}>
                      <Route index element={<AboutTab />} />
                      <Route path="about" element={<AboutTab />} />
                      <Route
                        path="collaboration"
                        element={<CollaborationTab isEditing={false} />}
                      />
                      <Route path="blog" element={<PublicUserBlog />} />
                      <Route
                        path="/user/:userId/blog/:postId"
                        element={<PublicPostView />}
                      />
                    </Route>
                    <Route path="/regulamin" element={<TermsPage />} />
                    <Route
                      path="/polityka-prywatnosci"
                      element={<PrivacyPolicyPage />}
                    />
                    <Route path="/cookies" element={<CookiesPage />} />
                    <Route path="/zwierzaki" element={<DogPage />} />
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
                <Footer />
              </AppContainer>
            )}
          </>
        )}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
