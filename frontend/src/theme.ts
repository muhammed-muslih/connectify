import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[600],
      light: blueGrey[500]
    }
  }
});

