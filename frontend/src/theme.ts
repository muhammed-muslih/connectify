import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { blueGrey ,blue,lightBlue} from "@mui/material/colors";

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[900],
      light: lightBlue[700],
    },
  },
});
