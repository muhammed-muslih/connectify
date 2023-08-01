import { Container,Typography ,Theme,Box,Badge} from "@mui/material"
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { makeStyles} from '@mui/styles';
import toast,{Toaster} from "react-hot-toast";
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import DynamicFeedSharpIcon from '@mui/icons-material/DynamicFeedSharp';
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../../redux/Features/reducers/adminAuthSlice";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme : Theme) =>({
    container :{
         height: '100vh',
         paddingTop :theme.spacing(16),
         [theme.breakpoints.down('md')]:{
            display:'none'
         },
         position:'sticky',
         top:0,
         [theme.breakpoints.up('lg')]:{
            BorderColor:theme.palette.primary.dark,
            border:'2px groove ',
        },
        overflowY: 'hidden',
        },
        item : {
            display : 'flex',
            alignItems : 'center',
            marginBottom :theme.spacing(6),
            marginLeft:theme.spacing(10),
            cursor: 'pointer',
            [theme.breakpoints.down('md')]:{
                display:'none',
            marginLeft:theme.spacing(),
            },
        },
        text : {
            color:theme.palette.primary.dark,
            [theme.breakpoints.down('lg')]:{
                display:'none'
            },    
        },
        icon : {
            color:theme.palette.primary.dark
        },
}))

 

const LeftBar = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutAdmin())
    }

    return(
        <Container className={classes.container}>
            <Toaster  position="top-right" reverseOrder={false}/>

            <Link to={'/admin'} style={{textDecoration:'none'}}>
            <Box  className={classes.item}>
                <DashboardIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Dashboard</Typography>
            </Box>
            </Link>

            <Link to={'/admin/users'} style={{textDecoration:'none'}}>
            <Box className={classes.item} >
                <PeopleAltSharpIcon fontSize="large" className={classes.icon}/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Users</Typography>
            </Box>
            </Link>

            <Box  className={classes.item}>
               <Badge badgeContent={8} color="secondary" overlap="circular">
                <NotificationsSharpIcon className={classes.icon} fontSize="large"/>
                </Badge>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Notifications</Typography>
            </Box>

            <Box className={classes.item}>
                <Box  display={'flex'}>
                <DynamicFeedSharpIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Posts</Typography>
                </Box>
               
            </Box>

            <Box className={classes.item}>
                <Box  display={'flex'}>
                <Brightness2OutlinedIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>SwitchTheme</Typography>
                </Box>
               
            </Box>

            <Box className={classes.item} onClick={logoutHandler} >
                <Box  display={'flex'}>
                <LogoutOutlinedIcon className={classes.icon} fontSize="large" />
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Logout</Typography>
                </Box>
               
            </Box>   
        </Container>

    )
}

export default  LeftBar