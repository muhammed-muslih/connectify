/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Container,Typography ,Theme,Box,Badge,Avatar, Divider} from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DensityMediumSharpIcon from '@mui/icons-material/DensityMediumSharp';
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { makeStyles} from '@mui/styles';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";



const useStyles = makeStyles((theme : Theme) =>({
    container :{
         height: '100vh',
         paddingTop :theme.spacing(20),
         [theme.breakpoints.down('md')]:{
            display:'none'
         },
         position:'sticky',
         top:0,
         [theme.breakpoints.up('lg')]:{
            BorderColor:theme.palette.primary.dark,
            border:'2px groove ',
        },
        overflowY: 'scroll',
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
        moreMenuItem : {
            display : 'flex',
            marginBottom :theme.spacing(1),
            marginLeft:theme.spacing(3),
            cursor: 'pointer',
            paddingTop:theme.spacing(2),
            color:'white'
        },
        menu :{
            marginLeft:theme.spacing(10),
            backgroundColor:theme.palette.primary.main,
            borderRadius:6,
            width:250,
            marginTop:theme.spacing(23.1),
            padding : theme.spacing(1)
        }
}))



const LeftBar = () =>{
    const [isOpen,setOpen] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()

    const logoutHandler = (e:React.MouseEvent) =>{
        e.preventDefault()
        dispatch(logoutUser())

    }

    return(
        <Container className={classes.container}>
            <Box  className={classes.item}>
                <HomeIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Home</Typography>
            </Box>
            <Box className={classes.item} >
                <Badge badgeContent={4} color="secondary" overlap="circular">
                <MessageIcon fontSize="large" className={classes.icon}/>
                </Badge>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Messages</Typography>
            </Box>
            <Box  className={classes.item}>
               <Badge badgeContent={8} color="secondary" overlap="circular">
                <FavoriteBorderIcon className={classes.icon} fontSize="large"/>
                </Badge>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Notification</Typography>
            </Box>
            <Box className={classes.item}>
                <AddBoxOutlinedIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Create</Typography>
            </Box>
            <Box  className={classes.item}>
                {/* <HomeIcon className={classes.icon} fontSize="large"/> */}
                <Avatar alt='profilePic' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Profile</Typography>
            </Box>

            {
                isOpen&&<Box  className={classes.menu} >
                    <Box  className={classes.moreMenuItem}>
                     <TurnedInNotRoundedIcon sx={{marginRight:2,fontSize:28}} />
                     <Typography  variant={'h5'} sx={{fontWeight:'bolder'}}>Saved</Typography>
                    </Box>

                    <Box  className={classes.moreMenuItem}>
                     <Brightness2OutlinedIcon sx={{marginRight:2,fontSize:28}} />
                     <Typography  variant={'h5'} sx={{fontWeight:'bolder'}}>Switch Theme</Typography>
                    </Box>

                    <Divider color={'white'}/>

                    <Box  className={classes.moreMenuItem} mt={1} onClick= {(e)=>logoutHandler(e)}>
                     <LogoutOutlinedIcon sx={{marginRight:2,fontSize:28}} />
                     <Typography  variant={'h5'} sx={{fontWeight:'bolder'}}>Logout</Typography>
                    </Box>

                </Box>
            }
            
            <Box className={classes.item} mt={isOpen?3.7 : 51} onClick={()=>setOpen(!isOpen)} >
                <DensityMediumSharpIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>More</Typography>
            </Box>
            

        </Container>

    )
}

export default  LeftBar