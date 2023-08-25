import { Box,Grid ,Theme} from "@mui/material"
import LeftBar from "../../components/Admin/LeftBar/LeftBar"
import { useSelector } from "react-redux"
import { selectAdminToken } from "../../redux/Features/reducers/adminAuthSlice"
import { Navigate } from "react-router-dom"
import { makeStyles} from '@mui/styles';
import NavBar from "../../components/User/NavBar/NavBar"
import AdminDashBoard  from "../../components/Admin/DashBoard/DashBoard"


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


const DashBoard = () =>{
    const classes = useStyles()
    const token = useSelector(selectAdminToken)

    if(token) {
        return (
            <Box>
            <NavBar admin/>
            <Grid container>
                <Grid item md={3}  className={classes.displayManager}><LeftBar/></Grid>
                <Grid item md={9} xs={12}><AdminDashBoard/></Grid>
            </Grid>
            <Box className={classes.bottomDisplay}>
            </Box>
        </Box>
        )

    }else {
        return(
            <Navigate to={'/admin/login'}/>

        )
    }
   
}

export default DashBoard