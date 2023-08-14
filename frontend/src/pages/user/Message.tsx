import { Box,Theme,Divider} from "@mui/material";
import MessageLargeDevice from "../../components/User/Chat/LargeDevice";
import MessageMediumDevice from "../../components/User/Chat/MediumDevice";
import MessageSmallDevice from "../../components/User/Chat/SmallDevice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    displayLargeDevice: {
      display:'block', 
      [theme.breakpoints.down("lg")]: {
        display: "none",
      },
    },
    displayMediumDevice : {
      display:'none', 
      [theme.breakpoints.between("md","lg")]: {
        display: "block",
      },
    },
    displaySmallDevice: {
      display:'none',  
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
    },
  }));



const Message = () => {
    const classes = useStyles()
    return(
        <Box>
            <Box className={classes.displayLargeDevice}><MessageLargeDevice/></Box>
            <Box className={classes.displayMediumDevice}><MessageMediumDevice/></Box>
            <Box className={classes.displaySmallDevice}><MessageSmallDevice/></Box>
        </Box>
    )
}

export default Message