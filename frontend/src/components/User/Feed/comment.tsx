import { Box, Stack ,Avatar,Typography,InputAdornment,TextField,IconButton} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";
import { commentProps } from "../../../types/PostInterfaces";
import { useAddReplyCommentMutation } from "../../../redux/Features/api/postApiSlice";
import toast, { Toaster } from "react-hot-toast";


const Comment: React.FC<commentProps> = ({comments,postId}) => {
    const [isReplyFieldOpen,setReplyFieldOpen] = useState<boolean>(false)
    const [isReplyVisible,setReplyVisible] = useState<boolean>(false)
    const [openReplyVisibleId,setOpenReplyVisibleId] = useState<string| null>(null)
    const [isReplyFieldOpenId,setReplyFieldOpenId] = useState<string| null>(null)
    const [replyComment,setReplyComment] = useState<string>('')

    const handleReplyField = (id:string) =>{
        setReplyFieldOpenId(id)
        setReplyFieldOpen(!isReplyFieldOpen)
        setReplyVisible(false)
        setOpenReplyVisibleId(null)
    }

    const handleReplyVisible = (id:string) => {
        setOpenReplyVisibleId(id)
        setReplyVisible(!isReplyVisible)
        setReplyFieldOpen(false)
        setReplyFieldOpenId(null)
        
    }

    const [addReplyComment,{isLoading}] = useAddReplyCommentMutation()

    const handleAddReplyComment = async (commentId:string) => {
        if(replyComment){
           try {
            const res = await addReplyComment({postId,text:replyComment,commentId}).unwrap()
            console.log(res);
            if(res.status === 'success'){
                setReplyFieldOpen(false)
                toast.success("reply comment added successfully");
            }
           } catch (error) {
            console.log(error);
           }
        }
    }

    return (
        <Box sx={{mt:4,}} boxShadow={2} p={2} borderRadius={2}>
         <Toaster position="top-right"/>

            {
                comments?.map((comment)=>(
                   <Box sx={{pt:2}} key={comment._id}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                     <Avatar sx={{width:50,height:50}}>{comment?.postedBy?.userName.split('')[0]}</Avatar>
                     <Box>
                        <Typography variant="body2">{comment?.postedBy?.userName}</Typography>
                       <Typography>{comment.text}</Typography>
                    </Box>
                    </Stack> 

                    <Stack direction={'row'} spacing={3} sx={{pl:8.5}}>
                    <Typography variant="body2" sx={{cursor: 'pointer'}}
                    onClick={()=>handleReplyField(comment._id)}
                    >replay</Typography>
                    <Typography variant="body2" sx={{cursor: 'pointer'}}
                    >{comment.replies.length ===0? <span>no comments</span>:<span
                    onClick={()=>handleReplyVisible(comment?._id)}
                    >view {comment.replies.length} reply</span>}</Typography>
                    </Stack>    

                    {  
                      comment?.replies.map((reply)=>(
                      isReplyVisible&&openReplyVisibleId === comment._id&&
                      <Box pl={8} key={reply._id}>
                      <Stack direction={'row'} alignItems={'center'} spacing={2} pt={2}>
                      <Avatar sx={{width:40,height:40}}>{reply.postedBy?.userName.split('')[0]}</Avatar>
                      <Box>
                      <Typography variant="body2">{reply.postedBy?.userName}</Typography>
                      <Typography>{reply.text}</Typography>
                      </Box>
                      </Stack>
                      </Box>

                    )) 
                    }
                     {
                         isReplyFieldOpen&&isReplyFieldOpenId === comment._id&&
                         <Box pl={8}>
                         <TextField id="standard-basic" placeholder="add comment..." variant="standard"
                         onChange={(e)=>setReplyComment(e.target.value)}
                          sx={{mt:2,}} fullWidth
                          InputProps={{endAdornment:
                           <InputAdornment position="end">
                           <IconButton onClick={()=>handleAddReplyComment(comment._id)}
                           aria-label="comment send icon">
                           <SendIcon/>
                           </IconButton>
                           </InputAdornment>
                      }}/>
                     </Box>
                     }
                     </Box>
                ))
                
            }
                    
        </Box>
    )
}

export default  Comment