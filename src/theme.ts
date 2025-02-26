import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#007a5a", // Main brand color (Green)
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3f0e40", // Sidebar color (Dark Purple)
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f8f8", // Light gray background
      paper: "#ffffff",
    },
    text: {
      primary: "#333333", // Dark text for readability
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export type ThemeType = typeof theme;
