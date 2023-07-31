import { Box,Grid ,Theme} from "@mui/material"
import NavBar from "../../components/User/NavBar/NavBar"
import LeftBar from "../../components/User/LeftBar/LeftBar"
import BottomNav from "../../components/User/BottomNav/BottomNav"
import { makeStyles} from '@mui/styles';
import Profile from "../../components/User/Profile/ProfileLayout";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../redux/Features/reducers/userAuthSlice";
import { Navigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>({
    displayManager : {
        [theme.breakpoints.down('md')]:{
            display : 'none'
        }
    },
    bottomDisplay : {
        [theme.breakpoints.up('md')]:{
            display : 'none'
        }
    },
    displayManager2 : {
        [theme.breakpoints.down('lg')]:{
            display : 'none'
        }
    },

}))

const UserProfile = () => {
    const classes = useStyles() 
    const token = useSelector(selectUserToken)
    if(token){
        return (
            <Box>
            <NavBar/>
            <Grid container>
                <Grid item md={3}  className={classes.displayManager}><LeftBar/></Grid>
                <Grid item md={9}><Profile/></Grid>
            </Grid>
            <Box className={classes.bottomDisplay}>
            <BottomNav/>
            </Box>
        </Box>
    
        )
    }else {
        return (
            <Navigate to={'/login'}/>
        )

    }
   
}

export default UserProfile