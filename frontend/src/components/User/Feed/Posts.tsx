import { Card,CardActionArea,CardMedia ,Theme,CardContent, Stack,Box,Avatar,Typography,
Divider,TextField, InputAdornment,IconButton} from "@mui/material"
import { makeStyles} from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SendIcon from '@mui/icons-material/Send';
import React, { useState,useRef, useEffect} from "react";
import { PostPropsInterface } from "../../../types/PropsInterfaces";
import { useLikeorDislikeMutation } from "../../../redux/Features/api/postApiSlice";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useSelector } from "react-redux";
import {selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import Comment from "./comment";
import { useAddCommentMutation } from "../../../redux/Features/api/postApiSlice";
import toast, { Toaster } from "react-hot-toast";


const useStyles = makeStyles((theme: Theme) =>({
    media : {
        height :750,    
        width:600,
        [theme.breakpoints.down('sm')]:{
            width:'100%'
         },
    },
    card :{
        marginBottom :theme.spacing(3),
        width:600,
        height :750,
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






const Posts:React.FC<PostPropsInterface> = ({_id,userName,imageName,imageUrl,description,profilePicture,likes,date,comments}) =>{
    const classes = useStyles()
    const [isLiked,setisLiked] = useState<boolean>(false)
    const [isCommentVisible ,setCommentVisible] = useState<boolean>(false)
    const [likeOrDislike,{isLoading}] = useLikeorDislikeMutation()
    const userId = useSelector(selectUserId)
    const [numberOfLikes,setnumberOfLikes] = useState<number>(likes?.length??0)
    const commentRef = useRef<HTMLInputElement | null>(null)
    const [postedTime,setPostedTime] = useState<string>('')
    const [isCommentOpen,setCommentOpen] = useState<boolean>(false)
    const [commentText,setCommentText] = useState<string>('')
    const commentHandler = () =>{
        commentRef.current?.focus()
        setCommentVisible(!isCommentVisible)
    }   
    const likeHandler = async () => {
        if(!isLoading){
            try {
                const res = await likeOrDislike({postId:_id}).unwrap()
            } catch (error) {
                console.log(error); 
            } 
        }
    }

    useEffect(()=>{
        const userLiked = likes?.find((id) => (id as any).toString() === userId);
        if(userLiked){
            setisLiked(true)
        }    
    },[])

    useEffect(()=>{
        if(date){
        const targetDateTime = new Date(date);
        const currentDateTime = new Date();
        const timeDifferenceMs : number =  currentDateTime.getTime()-targetDateTime.getTime()
        const seconds:number = Math.floor(timeDifferenceMs / 1000);
        const minutes:number = Math.floor(seconds / 60);
        const hours:number = Math.floor(minutes / 60);

        if(seconds < 60){
            setPostedTime('just now');

        }else if(minutes < 60){
            setPostedTime(`${minutes} minutes ago`)
        }else {
            setPostedTime(`${hours} hours ago`)
        }

        }
        
    },[])

    const commentContainerHandler = () => {
        setCommentOpen(!isCommentOpen)
    }

    const [addComment,{isLoading:isCommentAddLoading}] = useAddCommentMutation()
    const handleAddComment = async() => {
        if(commentText){
            if(!isCommentAddLoading){
                console.log(commentText);
                const res = await addComment({postId:_id,text:commentText}).unwrap()
                if(res.status === 'success'){
                    toast.success("comment added successfully");
                    setCommentVisible(false)
                }
                console.log(res,"addedd response");
            }

        }
    }
   
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
      <Toaster position="top-right"/>

        <Box>
            <Stack className="icon" spacing={2} direction={'row'} pb={1} ml={1} sx={{
                width:{
                    sm:'100%',
                    md:600
                }


            }} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'}>

                    {
                        profilePicture?
                        <Avatar alt='profilePic' sx={{
                            width:{
                                lg:60,
                            },
                            height:{
                                lg:60,
                            }
                            }} 
                            src= {profilePicture}/>
                            :
                            <Avatar alt='profilePic' sx={{
                                width:{
                                    lg:60,
                                },
                                height:{
                                    lg:60,
                                }
                                }}>{userName?.split('')[0]} </Avatar>
                            
                    }
                
                <Stack>
                <Typography sx={{
                    fontWeight:'bold',
                    pl:2,
                    fontSize:{
                        lg:16,
                    }
                    }} className={classes.color}>{userName}</Typography>
                  <Typography variant="body2" sx={{pl:2}} className={classes.color} >{postedTime}</Typography>
                  </Stack>

                </Stack>
                <Stack sx={{cursor:'pointer'}}>
                <MoreHorizIcon sx={{marginRight:2}}  className={classes.color}/>
                </Stack>
            </Stack>
        <Card className={classes.card} sx={{borderRadius:5}}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={imageUrl}
                />
            </CardActionArea>
        </Card>



        <Stack className="icon" spacing={2} direction={'row'} ml={1} sx={{
                width:{
                    sm:'100%',
                    md:600
                }


            }} justifyContent={'space-between'}>
                <Stack direction={'row'}>

                    {isLiked? 
                         <FavoriteRoundedIcon color={'info'} className={classes.bottomIcon} sx={{fontSize:28}}
                         onClick={()=>{
                            likeHandler()
                            setisLiked(false)
                            setnumberOfLikes(numberOfLikes-1)

                         }}
                         />
                         :
                        <FavoriteBorderRoundedIcon className={classes.bottomIcon} sx={{fontSize:28}}
                        onClick={()=>{
                            likeHandler()
                            setisLiked(true)
                            setnumberOfLikes(numberOfLikes+1)

                        }}
                        />
                    }
                    <ChatBubbleOutlineOutlinedIcon className={classes.bottomIcon} sx={{fontSize:28}} 
                    onClick={commentHandler}
                    />
                    <SendOutlinedIcon  className={classes.bottomIcon} sx={{fontSize:28}} />
                </Stack>
                <Stack sx={{cursor:'pointer'}}>
                <TurnedInNotRoundedIcon sx={{marginRight:2,fontSize:28}}  className={classes.color}/>
                </Stack>
           </Stack>

           <Stack p={2} pl={3}>
            <Box pr={10}>
                   <Typography variant="body1"> {numberOfLikes}   likes</Typography>
                    <Typography variant="body1">
                     <span style={{fontWeight:'bolder',paddingRight:10,fontSize:16}} className={classes.color}>{userName}</span> {description}
                    </Typography >
                    <Typography variant='body2' sx={{fontWeight:'medium',cursor:'pointer'}}>{comments?.length !=0?<span
                    onClick={commentContainerHandler}
                    >view {comments?.length} comments....</span>:<span>no comments....</span>}</Typography>
                    <Stack>
                        {
                            isCommentOpen&&<Comment comments={comments} postId={_id}/>
                        }
                    </Stack>
                    <Stack>
                   {
                    isCommentVisible&&
                    <TextField id="standard-basic" placeholder="add comment..." variant="standard"
                    onChange={(e)=> setCommentText(e.target.value)}
                    inputRef={commentRef}
                    InputProps={{endAdornment:
                     <InputAdornment position="end">
                     <IconButton aria-label="comment send icon" onClick={handleAddComment}>
                     <SendIcon />
                     </IconButton>
                     </InputAdornment>
                    }}
                    />
                   }
                   </Stack>
            </Box>
           </Stack>
        </Box>
        <Divider />
        </Stack>
    )

}
export default Posts