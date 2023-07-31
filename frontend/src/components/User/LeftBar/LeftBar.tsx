import { Container,Typography ,Theme,Box,Badge,Avatar, Divider} from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { makeStyles} from '@mui/styles';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { useNavigate } from "react-router-dom";
import CreateModal from "../Modal/Create";
import toast,{Toaster} from "react-hot-toast";




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
            padding : theme.spacing(1),
            [theme.breakpoints.down('lg')]:{
                width:80
            }, 
        },
        moreMenuText : {
            fontWeight:'bolder',
            [theme.breakpoints.down('lg')]:{
                display:'none'
            },
        }
}))



const LeftBar = () =>{
    const navigate = useNavigate()
    const id = useSelector(selectUserId)
    const classes = useStyles()
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);
    const [isAdded, setIsAdded] = useState<boolean>(false);

    const logoutHandler = (e:React.MouseEvent) =>{
        e.preventDefault()
        dispatch(logoutUser())

    }
    const handleNavigate = () => {
        if(id){
            navigate(`/profile/${id}`)
        }
    }

    useEffect(()=>{
    if(isAdded){
    }
    },[isAdded]);

    return(
        <Container className={classes.container}>
            <Toaster  position="top-right" reverseOrder={false}/>
            <Link to={'/'} style={{textDecoration:'none'}}>
            <Box  className={classes.item}>
                <HomeIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Home</Typography>
            </Box>
            </Link>
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
                <Box onClick={handleModalOpen} display={'flex'}>
                <AddBoxOutlinedIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Create</Typography>
                </Box>
                <CreateModal openModal={openModal} handleModalClose={handleModalClose} setIsAdded={setIsAdded}/>
            </Box>

            <Box className={classes.item}>
                <Box  display={'flex'}>
                <TurnedInNotRoundedIcon className={classes.icon} fontSize="large"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Saved</Typography>
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

            <Box className={classes.item} onClick= {(e)=>logoutHandler(e)}>
                <Box  display={'flex'}>
                <LogoutOutlinedIcon className={classes.icon} fontSize="large" />
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Logout</Typography>
                </Box>
               
            </Box>
            

            <Box  className={classes.item}
            onClick={()=>handleNavigate()}
             
             >
                <Avatar alt='profilePic' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                <Typography  variant={'h5'} sx={{fontWeight:'bolder',marginLeft:{
                    xs:1,
                    md:2,
                    lg:3
                }}} className={classes.text}>Profile</Typography>
            </Box>
         
            
        </Container>

    )
}

export default  LeftBar