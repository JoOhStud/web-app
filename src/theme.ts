// theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#8d6e63", // SaddleBrown – główny odcień brązu
      light: "#ffffff63", // RosyBrown – jasny odcień brązu
    },
    secondary: {
      main: "#D7CCC8", // DarkOliveGreen – ziemisty odcień zieleni
    },
    background: {
      default: "#efebe982", // Beige – delikatny beż jako tło całej aplikacji
      paper: "#EFEBE9", // Cornsilk – jasny odcień dla elementów typu "paper" (np. panele, karty)
    },
  },

  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontWeightBold: 700,
  },
});
