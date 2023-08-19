import {
  Box,
  Stack,
  Avatar,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import { ReplyInterface, commentProps } from "../../../types/PostInterfaces";
import { useAddReplyCommentMutation } from "../../../redux/Features/api/postApiSlice";
import toast, { Toaster } from "react-hot-toast";
import Confirmation from "../Modal/Cofirmation";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/Features/reducers/userAuthSlice";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { selectUserProfilePic } from "../../../redux/Features/reducers/userAuthSlice";

const Comment: React.FC<commentProps> = ({
  comments,
  postId,
  profilePicture,
  setIsDelete,
  setDeleteCmntId,
  isDelete,
  isCommentUpdated,
  setCommentUpdated
}) => {
  const [isReplyFieldOpen, setReplyFieldOpen] = useState<boolean>(false);
  const [isReplyVisible, setReplyVisible] = useState<boolean>(false);
  const [openReplyVisibleId, setOpenReplyVisibleId] = useState<string | null>(
    null
  );
  const [isReplyFieldOpenId, setReplyFieldOpenId] = useState<string | null>(
    null
  );
  const [newReplyComment, setNewReplyComment] = useState<string>("");
  const [comment, setComment] = useState(comments??[]);
  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);
  const userProfilePic = useSelector(selectUserProfilePic);
  

  const handleReplyField = (id: string) => {
    setReplyFieldOpenId(id);
    setReplyFieldOpen(!isReplyFieldOpen);
    setReplyVisible(false);
    setOpenReplyVisibleId(null);
  };

  const handleReplyVisible = (id: string) => {
    setOpenReplyVisibleId(id);
    setReplyVisible(!isReplyVisible);
    setReplyFieldOpen(false);
    setReplyFieldOpenId(null);
  };

  const [addReplyComment, { isLoading }] = useAddReplyCommentMutation();

  const handleAddReplyComment = async (commentId: string) => {
    if (newReplyComment) {
      try {
        const res = await addReplyComment({
          postId,
          text: newReplyComment,
          commentId,
        }).unwrap();
        console.log(res);
        if (res.status === "success") {
          const newReply = {
            _id: res.result?._id,
            text: res.result?.text,
            postedBy: {
              _id: userId,
              userName: userName,
              profilePicture: userProfilePic,
              createdAt: new Date(),
            },
            created: res.result?.created,
          } as ReplyInterface;
          setComment((prevComments) =>
            prevComments.map((comment) => {
              if (comment._id === commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, newReply],
                };
              }
              return comment;
            })
          );

          setReplyFieldOpen(false);
          // toast.success("reply comment added successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

 

  useEffect(()=>{
    setComment(comments??[])
  },[isCommentUpdated,isDelete])


 
  return (
    <Box sx={{ mt: 4 }} boxShadow={2} p={2} borderRadius={2}>
      <Toaster position="top-right" />

      {comment?.map((cmnt) => (
        <Box sx={{ pt: 2 }} key={cmnt._id}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            {cmnt.postedBy?.profilePicture ? (
              <Avatar
                sx={{ width: 50, height: 50 }}
                src={cmnt.postedBy?.profilePicture}
              />
            ) : (
              <Avatar sx={{ width: 50, height: 50 }}>
                {cmnt?.postedBy?.userName?.split("")[0]}
              </Avatar>
            )}

            <Box>
              <Typography variant="body2">
                {cmnt?.postedBy?.userName}
              </Typography>
              <Typography>{cmnt.text}</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ cursor: "pointer" }}>
              <Confirmation
                commentId={cmnt._id}
                commentedUser={cmnt.postedBy?._id}
                postId={postId}
                setIsDelete={setIsDelete}
                setDeleteCmntId={setDeleteCmntId}
              />
            </Box>
          </Stack>

          <Stack direction={"row"} spacing={3} sx={{ pl: 8.5 }}>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer" }}
              onClick={() => handleReplyField(cmnt._id)}
            >
              replay
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              {cmnt.replies.length === 0 ? (
                <span>no comments</span>
              ) : (
                <span onClick={() => handleReplyVisible(cmnt?._id)}>
                  view {cmnt.replies.length} reply
                </span>
              )}
            </Typography>
          </Stack>

          {cmnt?.replies.map(
            (reply) =>
              isReplyVisible &&
              openReplyVisibleId === cmnt._id && (
                <Box pl={8} key={reply._id}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={2}
                    pt={2}
                  >
                    {reply.postedBy?.profilePicture ? (
                      <Avatar
                        sx={{ width: 40, height: 40 }}
                        src={reply.postedBy?.profilePicture}
                      />
                    ) : (
                      <Avatar sx={{ width: 40, height: 40 }}>
                        {reply.postedBy?.userName.split("")[0]}
                      </Avatar>
                    )}

                    <Box>
                      <Typography variant="body2">
                        {reply.postedBy?.userName}
                      </Typography>
                      <Typography>{reply.text}</Typography>
                    </Box>
                  </Stack>
                </Box>
              )
          )}
          {isReplyFieldOpen && isReplyFieldOpenId === cmnt._id && (
            <Box pl={8}>
              <TextField
                id="standard-basic"
                placeholder="add comment..."
                variant="standard"
                onChange={(e) => setNewReplyComment(e.target.value)}
                sx={{ mt: 2 }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleAddReplyComment(cmnt._id)}
                        aria-label="comment send icon"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Comment;
