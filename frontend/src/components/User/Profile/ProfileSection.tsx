import { Stack,Box ,Avatar,Typography,Theme,Button,Divider} from "@mui/material"
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { makeStyles} from '@mui/styles';
import React,{ useEffect, useState } from "react";
import { ProfileProps } from "../../../types/PropsInterfaces";
import { theme } from "../../../theme";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { useGetUserQuery } from "../../../redux/Features/api/userApiSlice";
import { useParams } from "react-router-dom";
import { useFollowAndUnFollowMutation } from "../../../redux/Features/api/userApiSlice";



const useStyles = makeStyles((theme : Theme) => ({

    profileContentBoxs : {
        paddingLeft:theme.spacing(6),
        paddingTop:theme.spacing(5)
    },
    text : {
        color:theme.palette.primary.dark
    },
    btn1 : {
        size:'large',
        '&:hover':{
            backgroundColor : theme.palette.primary.light
        },
    },
    profileContent : {
        paddingLeft:theme.spacing(6),
        paddingTop:theme.spacing(5)
    },
    displayCls : {
        [theme.breakpoints.down('lg')]:{
            display:'none'
         },
    },
    displayCls1 : {
        display:'none',
        [theme.breakpoints.down('lg')]:{
            display:'block'
         },
    }
})) 

const ProfileSection :React.FC<ProfileProps>  = ({isUserPost,setUserPost,setCurrentUser,isCurrentUser,noOfPosts}) => {
    const classes = useStyles()
    const currentUserId = useSelector(selectUserId)
    const [isFollow,setIsFollow] = useState<boolean | undefined>(false)
    const [isFollowing,setIsFollowing] = useState<boolean | undefined>(false)
    const [profilePicture,setProfilePicture] = useState<string>()
    const [profileName,setProfileName] = useState<string>()
    const [followers,setFollowers] = useState<string[]>()
    const [followings,setFollowings] = useState<string[]>()
   


    const [bio,setBio] = useState<string>()
    const{id:userId} = useParams()
    const {data:user,isLoading,isFetching} = useGetUserQuery({id:userId})
    useEffect(()=>{
        if(!isLoading){
            if(user?.status === 'success'){
            setProfileName(user.user.userName)
            setProfilePicture(user.user?.profilePicture)
            setBio(user.user.bio)
            setFollowers(user.user.followers)
            setFollowings(user.user.followings)
        }

        }
    },[userId,user])

    useEffect(()=>{
        setIsFollow(followers?.includes(currentUserId))
        setIsFollowing(followings?.includes(currentUserId))

    },[followings,followers])
    
    useEffect(()=>{
        if(currentUserId === userId){
            setCurrentUser(true)
        }

    },[currentUserId,userId])


    const [followAndUnfollow,{isLoading:Followloading}] = useFollowAndUnFollowMutation()
    const followHandler = async () => {
        try {
            const res = await followAndUnfollow({followedUserId:userId}).unwrap()
            console.log(res);
            
        } catch (error) {
            console.log(error);   
        }
       
    }
    return (
        <Box ml={{  
            sm:10,
            md:0
        }} >
        <Stack direction={"row"} spacing={{
            sm:2,
            lg:4,
        }} pt={6} marginBottom={5}>
            <Box>
                {
                    profilePicture?
                    <Avatar 
                    sx={{
                      width:{
                          xs:160,
                          md:200,
                          lg:250
                      },
                      height:{
                          xs:160,
                          md:200,
                          lg:250
                      }
                  }}
                   src={profilePicture}/>
                   :
                   <Avatar 
                    sx={{
                      width:{
                          xs:160,
                          md:200,
                          lg:250
                      },
                      height:{
                          xs:160,
                          md:200,
                          lg:250
                      },
                      fontWeight:'bolder',
                      fontSize:'60px',
                      bgcolor:theme.palette.primary.light
                    
                  }} >{profileName?.split('')[0] }{profileName?.split('')[profileName.length-1]}</Avatar>
                }
                
            </Box>
            <Box>
                  {/* largeDevice */}
               <Box className = {classes.displayCls}>
                <Stack direction={'row'} spacing={3}  className={classes.profileContent}>
                    <Typography variant="h5" className={classes.text} fontWeight={'bolder'}>{profileName}</Typography>
                {
                      profileName&&isCurrentUser? 
                        <Button variant="contained" size="large" className={classes.btn1} disableRipple disableElevation>edit profile</Button>
                        :
                        <Stack spacing={3} direction={'row'}>
                          {
                            isFollow?
                            <Button variant="contained" size="large" className={classes.btn1} disableRipple disableElevation 
                            onClick={()=>{
                                setIsFollow(false)
                                followHandler()
                            }}
                            >Following</Button>
                            :isFollowing ?
                            <Button variant="contained" size="large" className={classes.btn1} disableRipple disableElevation
                            onClick={()=>{
                                setIsFollow(true)
                                followHandler()
                            }}
                            >Followback</Button>
                            :
                            <Button variant="contained" size="large" className={classes.btn1} disableRipple disableElevation
                            onClick={()=>{
                                setIsFollow(true)
                                followHandler()
                            }}
                            >Follow</Button>
                          }
                          <Button variant="outlined" size="large" disableRipple disableElevation>Message</Button>
                        </Stack>
                    }
                </Stack>
                </Box>
                
               <Box className = {classes.displayCls}>
                <Stack  className={classes.profileContentBoxs} direction={'row'} spacing={6}>
                    <Typography variant="h6" sx={{fontWeight:'bolder'}} className={classes.text}>{noOfPosts} posts</Typography>
                    <Typography variant="h6" sx={{fontWeight:'bolder'}} className={classes.text}>{followers?.length} followers</Typography>
                    <Typography variant="h6" sx={{fontWeight:'bolder'}} className={classes.text}>{followings?.length}following</Typography>
                </Stack>
                </Box>

               <Box className = {classes.displayCls}>
                <Stack  className={classes.profileContentBoxs}  direction={'row'} spacing={6}>
                    <Typography variant="h6" sx={{fontWeight:'bolder'}} className={classes.text}>
                        {
                            bio?bio:''
                        }
                    </Typography>
                </Stack>
                </Box>
                {/* small devices */}

                <Box className = {classes.displayCls1}>
                <Stack direction={'row'} spacing={2}  className={classes.profileContent}>
                    <Typography variant="body1" className={classes.text} fontWeight={'bolder'}>{profileName}</Typography>
                    {
                         profileName&&isCurrentUser? 
                         <Button variant="contained" size="large" className={classes.btn1} disableRipple disableElevation>edit profile</Button>
                         :
                         <Stack spacing={3} direction={'row'}>
                           {
                             isFollow?
                             <Button variant="contained" size="small" className={classes.btn1} disableRipple disableElevation 
                             onClick={()=>{
                                 setIsFollow(false)
                                 followHandler()
                             }}
                             >Following</Button>
                             :isFollowing ?
                             <Button variant="contained" size="small" className={classes.btn1} disableRipple disableElevation
                             onClick={()=>{
                                 setIsFollow(true)
                                 followHandler()
                             }}
                             >Followback</Button>
                             :
                             <Button variant="contained" size="small" className={classes.btn1} disableRipple disableElevation
                             onClick={()=>{
                                 setIsFollow(true)
                                 followHandler()
                             }}
                             >Follow</Button>
                           }
                           <Button variant="outlined" size="small" disableRipple disableElevation>Message</Button>
                        </Stack>
                    }
                </Stack>
                </Box>
                
               <Box className = {classes.displayCls1}>
                <Stack  className={classes.profileContentBoxs} direction={'row'} spacing={2}>
                    <Typography variant="body1" sx={{fontWeight:'bolder'}} className={classes.text}>{noOfPosts} posts</Typography>
                    <Typography variant="body1" sx={{fontWeight:'bolder'}} className={classes.text}>{followers?.length} followers</Typography>
                    <Typography variant="body1" sx={{fontWeight:'bolder'}} className={classes.text}>{followings?.length} following</Typography>
                </Stack>
                </Box>

               <Box className = {classes.displayCls1}>
                <Stack  className={classes.profileContentBoxs}  direction={'row'} spacing={2}>
                    <Typography variant="body1" sx={{fontWeight:'bolder'}} className={classes.text}>
                    {
                            bio?bio:''
                        }
                    </Typography>
                </Stack>
                </Box>

            </Box>
        </Stack>
        <Divider orientation="horizontal" />
        <Box sx={{display:'flex',mt:1,alignItems:'center',px:{
            lg:60,
            xs:26,
            md:35,

        }}}>
            <AppsOutlinedIcon sx={{fontSize:{sm:26,md:32},cursor:'pointer'}} className={classes.text}
             onClick= {()=>{
                if(!isUserPost){
                    setUserPost(!isUserPost)
                }
                }}
            />

            {
                isCurrentUser? <BookmarkBorderOutlinedIcon sx={{fontSize:{sm:26,md:32},marginLeft:5,cursor:'pointer'}} className={classes.text}
                  onClick= {()=>{
                    if(isUserPost){
                        setUserPost(!isUserPost)
                    }
                 }}
                />
                : ""
            }
        </Box>
        </Box>
    )
}

export default  ProfileSection