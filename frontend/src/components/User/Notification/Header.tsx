import { Box,Typography,Theme } from "@mui/material"
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles((theme:Theme)=>({
    color:{
        color:theme.palette.primary.main        
    }

}))

const classes = {
    headerBox :{
        marginTop:7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding:2,
        boxShadow:5,
        position:'sticky',
        top:74,
        zIndex: 1,
        backgroundColor: '#ffffff',
    },
    headerText:{
        fontWeight: 'bolder',

    }
}

const Header = () => {
    const styledClasses = useStyles()
    return (
        <Box sx={classes.headerBox} className={styledClasses.color}>
            <Typography variant="h5" sx={classes.headerText}>Notifications</Typography>
        </Box>
    )
}

export default Header