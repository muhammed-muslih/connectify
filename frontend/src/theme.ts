import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { blueGrey, lightBlue } from "@mui/material/colors";

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[900],
      light: lightBlue[700],
    },
  },
});

export { theme };
