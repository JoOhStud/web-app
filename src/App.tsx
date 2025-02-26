// App.tsx
import React, { useEffect, useState } from "react";
import { CssBaseline, CircularProgress, Typography } from "@mui/material";
import { AppContainer } from "./App.styles";
import { theme } from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useAuth, hasAuthParams } from "react-oidc-context";
import ChatPage from "./components/chat/Chat";
import api from "./axiosInstance";

const App: React.FC = () => {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (auth.user?.access_token) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.user.access_token}`;
    }
  }, [auth.user?.access_token]);

  useEffect(() => {
    if (
      !(
        hasAuthParams() ||
        auth.isAuthenticated ||
        auth.activeNavigator ||
        auth.isLoading ||
        hasTriedSignin
      )
    ) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (auth.isLoading) {
    return (
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <CircularProgress />
        </StyledThemeProvider>
      </MuiThemeProvider>
    );
  }

  if (!auth.isAuthenticated) {
    // If not authenticated, display a message while redirecting
    return (
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <Typography variant="h4" align="center" sx={{ mt: 4 }}>
            Redirecting to login...
          </Typography>
        </StyledThemeProvider>
      </MuiThemeProvider>
    );
  }

  // When authenticated, render the ChatPage component
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <AppContainer>
          <ChatPage />
        </AppContainer>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
