import { Card,CardActionArea,CardMedia ,Theme,CardContent, Stack,Box,Avatar,Typography,Divider} from "@mui/material"
import { makeStyles} from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';




const useStyles = makeStyles((theme: Theme) =>({
    media : {
        height :700,
        width:600,
        [theme.breakpoints.down('sm')]:{
            width:'100%'
         },
    },
    card :{
        marginBottom :theme.spacing(3),
        width:600,
        height :700,
        [theme.breakpoints.down('sm')]:{
            width:'100%'
         },
    },
    bottomIcon :{
        marginLeft : theme.spacing(3),
        color:theme.palette.primary.dark,
        '&:hover':{
            color:theme.palette.primary.main
        },
        cursor:'pointer'
    },
    color:{
        color:theme.palette.primary.dark
    }
}))




const Posts = () =>{
    const classes = useStyles()
    return(
        <Stack 
        sx={{
            px :{
                md:0,
                lg:20
            }
        }} 
        mb={3}
        >
        <Box>
            <Stack className="icon" spacing={2} direction={'row'} pb={1} ml={1} sx={{
                width:{
                    sm:'100%',
                    md:600
                }


            }} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'}>
                <Avatar alt='profilePic' sx={{
                    width:{
                        lg:60,
                    },
                    height:{
                        lg:60,
                    }
                    }} 
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                <Typography sx={{
                    fontWeight:'bold',
                    pl:2,
                    fontSize:{
                        lg:16,
                    }
                    }} className={classes.color}> userName</Typography>
                </Stack>
                <Stack sx={{cursor:'pointer'}}>
                <MoreHorizIcon sx={{marginRight:2}}  className={classes.color}/>
                </Stack>
            </Stack>
        <Card className={classes.card} sx={{borderRadius:5}}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                />
            </CardActionArea>
            <CardContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quam consequatur eligendi sit incidunt neque itaque minus libero consequuntur vitae aperiam assumenda delectus tempore corrupti! Illo harum enim amet deserunt!</CardContent>
        </Card>



        <Stack className="icon" spacing={2} direction={'row'} ml={1} sx={{
                width:{
                    sm:'100%',
                    md:600
                }


            }} justifyContent={'space-between'}>
                <Stack direction={'row'}>
                    <FavoriteBorderRoundedIcon className={classes.bottomIcon} sx={{fontSize:28}}/>
                    <ChatBubbleOutlineOutlinedIcon className={classes.bottomIcon} sx={{fontSize:28}} />
                    <SendOutlinedIcon  className={classes.bottomIcon} sx={{fontSize:28}} />
                </Stack>
                <Stack sx={{cursor:'pointer'}}>
                <TurnedInNotRoundedIcon sx={{marginRight:2,fontSize:28}}  className={classes.color}/>
                </Stack>
           </Stack>

           <Stack p={2} pl={3}>
            <Box pr={10}>
                   <Typography variant="body1">5,421 likes</Typography>
                    <Typography variant="body2">
                     <span style={{fontWeight:'bolder',paddingRight:10}}>UserName</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.🍃❤️
                    </Typography >
                    <Typography variant='body2'>View all comments.....</Typography>
            </Box>
           </Stack>
        </Box>
        <Divider />
        </Stack>
    )

}
export default Posts