import { blueGrey } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';


export const theme : Theme = createTheme({
    palette:{
        primary: {
            main:blueGrey[600],
            light:blueGrey[500]
        }
    },
})



