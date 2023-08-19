import {
  Card,
  CardActionArea,
  CardMedia,
  Theme,
  CardContent,
  Stack,
  Box,
  Avatar,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useRef, useEffect } from "react";
import { PostPropsInterface } from "../../../types/PropsInterfaces";
import { useLikeorDislikeMutation } from "../../../redux/Features/api/postApiSlice";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import Comment from "./comment";
import { useAddCommentMutation } from "../../../redux/Features/api/postApiSlice";
import toast, { Toaster } from "react-hot-toast";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useSaveAndUnSavePostMutation } from "../../../redux/Features/api/userApiSlice";
import Modal from "../Modal/modal";
import ReportModal from "../Modal/ReportModal";
import DeletModal from "../Modal/DeleteModal";
import EditModal from "../Modal/EditModal";
import { selectUserName } from "../../../redux/Features/reducers/userAuthSlice";
import { selectUserProfilePic } from "../../../redux/Features/reducers/userAuthSlice";


const useStyles = makeStyles((theme: Theme) => ({
  media: {
    height: 730,
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  card: {
    marginBottom: theme.spacing(3),
    width: 600,
    height: 730,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  bottomIcon: {
    marginLeft: theme.spacing(3),
    color: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.primary.main,
    },
    cursor: "pointer",
  },
  color: {
    color: theme.palette.primary.dark,
  },
  iconColor: {
    color: theme.palette.primary.light,
  },
}));

const Posts: React.FC<PostPropsInterface> = ({
  _id,
  userName,
  imageName,
  imageUrl,
  description,
  profilePicture,
  likes,
  date,
  comments,
  saved,
  postUserId,
  singlePost,
  setDelete,
  setDeletedId,
  setIsEdited,
  setEditedId,
  setEditedText
}) => {
  const classes = useStyles();
  const [comment, setComment] = useState(comments ?? []);
  const [isLiked, setisLiked] = useState<boolean>(false);
  const [isCommentVisible, setCommentVisible] = useState<boolean>(false);
  const [likeOrDislike, { isLoading }] = useLikeorDislikeMutation();
  const userId = useSelector(selectUserId);
  const currentUserName = useSelector(selectUserName);
  const currentUserProfile = useSelector(selectUserProfilePic);
  const [numberOfLikes, setnumberOfLikes] = useState<number>(
    likes?.length ?? 0
  );
  const commentRef = useRef<HTMLInputElement | null>(null);
  const [postedTime, setPostedTime] = useState<string>("");
  const [isCommentOpen, setCommentOpen] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isModalopen, setModalopen] = useState<boolean>(false);
  const [isReportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [isCurrentUserPost, setCurrentUserPost] = useState<boolean>(
    postUserId === userId ? true : false
  );
  const [isDelete,setIsDelete] = useState(false)
  const [isCommentUpdated,setCommentUpdated] = useState(false)
  const [deleteCmntId,setDeleteCmntId] = useState<string>()
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const commentHandler = () => {
    commentRef.current?.focus();
    setCommentVisible(!isCommentVisible);
  };

  const likeHandler = async () => {
    if (!isLoading) {
      try {
        const res = await likeOrDislike({ postId: _id }).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const userLiked = likes?.find((id) => (id as any).toString() === userId);
    const userSaved = saved?.find((id) => (id as any).toString() === _id);

    if (userLiked) {
      setisLiked(true);
    }
    if (userSaved) {
      setIsSaved(true);
    }
  }, []);

  useEffect(() => {
    if (date) {
      const targetDateTime = new Date(date);
      const currentDateTime = new Date();
      const timeDifferenceMs: number =
        currentDateTime.getTime() - targetDateTime.getTime();
      const seconds: number = Math.floor(timeDifferenceMs / 1000);
      const minutes: number = Math.floor(seconds / 60);
      const hours: number = Math.floor(minutes / 60);
      const days: number = Math.floor(hours / 24);

      if (seconds <= 60) {
        setPostedTime("just now");
      } else if (minutes <= 60) {
        setPostedTime(`${minutes} minutes ago`);
      } else if (hours <= 24) {
        setPostedTime(`${hours} hours ago`);
      } else {
        setPostedTime(`${days} days ago`);
      }
    }
  }, []);

  const commentContainerHandler = () => {
    setCommentOpen(!isCommentOpen);
  };

  const [addComment, { isLoading: isCommentAddLoading }] =
    useAddCommentMutation();
  const handleAddComment = async () => {
    if (commentText) {
      if (!isCommentAddLoading) {
        try {
          const res = await addComment({
            postId: _id,
            text: commentText,
          }).unwrap();
          if (res.status === "success") {
            if (res?.result && res.result?.length > 0) {
              const lastComment = res.result[res.result.length - 1];

              const newPostedBy = {
                ...lastComment.postedBy,
                _id: userId,
                userName: currentUserName,
                profilePicture: currentUserProfile ?? "",
              };

              const updatedComment = {
                ...lastComment,
                postedBy: newPostedBy,
              };
              setComment((prev) => [...prev, updatedComment]);
              setCommentUpdated(!isCommentUpdated)
            }
            // toast.success("comment added successfully");
            setCommentVisible(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(()=>{
    if(isDelete){
      setComment((prevComments) =>
      prevComments.filter((comment) => comment._id !== deleteCmntId)
    )}
    setIsDelete(false)
    if(comment?.length===0){
      setCommentOpen(false)
    }
  },[isDelete])

  

  const [saveAndUnsave, { isLoading: savePostLoading }] =
    useSaveAndUnSavePostMutation();
  const handlePostSave = async () => {
    if (!savePostLoading) {
      try {
        const res = await saveAndUnsave({ postId: _id }).unwrap();
        if (res.status === "success") {
          toast.success(res.message);
          setIsSaved(!isSaved);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleModal = () => {
    setModalopen(!isModalopen);
  };
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);
  return (
    <Stack sx={{ px: { md: 0, lg: 20 }, position: "relative" }} mb={2}>
      <Toaster position="top-right"/>
      <Box>
        <Stack
          spacing={2}
          direction={"row"}
          pb={1}
          ml={1}
          sx={{
            width: {
              sm: "100%",
              md: 600,
            },
            position: "relative",
          }}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            {profilePicture ? (
              <Avatar
                alt="profilePic"
                sx={{ width: { lg: 60 }, height: { lg: 60 } }}
                src={profilePicture}
              />
            ) : (
              <Avatar
                alt="profilePic"
                sx={{ width: { lg: 60 }, height: { lg: 60 } }}
              >
                {userName?.split("")[0]}{" "}
              </Avatar>
            )}
            <Stack>
              <Typography
                sx={{
                  fontWeight: "bold",
                  pl: 2,
                  fontSize: {
                    lg: 16,
                  },
                }}
                className={classes.color}
              >
                {userName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ pl: 2 }}
                className={classes.color}
              >
                {postedTime}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ cursor: "pointer" }}>
            {!singlePost && (
              <MoreHorizIcon
                sx={{ marginRight: 2 }}
                className={classes.color}
                onClick={handleModal}
              />
            )}
          </Stack>

          <Stack
            sx={{ zIndex: 100, position: "absolute", right: 0, top: 30 }}
            display={isModalopen ? "block" : "none"}
          >
            <Modal
              isCurrentUserPost={isCurrentUserPost}
              setReportModalOpen={setReportModalOpen}
              setModalopen={setModalopen}
              handleOpenDeleteModal={handleOpenDeleteModal}
              handleOpenEditModal={handleOpenEditModal}
            />
          </Stack>
        </Stack>
        {isReportModalOpen && (
          <Stack
            sx={{ zIndex: 100, position: "absolute", top: "30%", left: "30%" }}
            boxShadow={10}
          >
            <ReportModal setReportModalOpen={setReportModalOpen} postId={_id} />
          </Stack>
        )}
        <Card className={classes.card} sx={{ borderRadius: 5 }}>
          <CardActionArea>
            <CardMedia className={classes.media} image={imageUrl} />
          </CardActionArea>
        </Card>

        <Stack>
          <DeletModal
            open={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            postId={_id}
            setDelete={setDelete}
            setDeletedId={setDeletedId}
          />
        </Stack>
        <Stack>
          <EditModal
            open={openEditModal}
            handleClose={handleCloseEditModal}
            description={description}
            postId={_id}
            setIsEdited={setIsEdited}
            setEditedId={setEditedId}
            setEditedText={setEditedText}
          />
        </Stack>

        <Stack
          className="icon"
          spacing={2}
          direction={"row"}
          ml={0}
          sx={{
            width: {
              sm: "100%",
              md: 600,
            },
          }}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"}>
            {isLiked ? (
              <FavoriteRoundedIcon
                color={"info"}
                className={classes.bottomIcon}
                sx={{ fontSize: 28, color: "info" }}
                onClick={() => {
                  likeHandler();
                  setisLiked(false);
                  setnumberOfLikes(numberOfLikes - 1);
                }}
              />
            ) : (
              <FavoriteBorderRoundedIcon
                className={classes.bottomIcon}
                sx={{ fontSize: 28 }}
                onClick={() => {
                  likeHandler();
                  setisLiked(true);
                  setnumberOfLikes(numberOfLikes + 1);
                }}
              />
            )}
            <ChatBubbleOutlineOutlinedIcon
              className={classes.bottomIcon}
              sx={{ fontSize: 28 }}
              onClick={commentHandler}
            />
          </Stack>
          {userId !== postUserId && postUserId && (
            <Stack sx={{ cursor: "pointer" }}>
              {isSaved ? (
                <BookmarkIcon
                  sx={{ marginRight: 2, fontSize: 28 }}
                  className={classes.iconColor}
                  onClick={handlePostSave}
                />
              ) : (
                <TurnedInNotRoundedIcon
                  sx={{ marginRight: 2, fontSize: 28 }}
                  className={classes.iconColor}
                  onClick={handlePostSave}
                />
              )}
            </Stack>
          )}
        </Stack>

        <Stack p={2} pl={3}>
          <Box pr={10}>
            <Typography variant="body1"> {numberOfLikes} likes</Typography>
            <Typography variant="body1">
              <span
                style={{ fontWeight: "bolder", paddingRight: 10, fontSize: 16 }}
                className={classes.color}
              >
                {userName}
              </span>{" "}
              {description}
            </Typography>

            {comment?.length != 0 ? (
              <Typography
                variant="body2"
                onClick={commentContainerHandler}
                sx={{ cursor: "pointer" }}
              >
                View {comment?.length} comments...
              </Typography>
            ) : (
              <Typography variant="body2">no comments....</Typography>
            )}
            <Stack>
              {isCommentOpen && (
                <Comment
                  comments={comment}
                  postId={_id}
                  profilePicture={profilePicture}
                  setIsDelete={setIsDelete}
                  setDeleteCmntId={setDeleteCmntId}
                  isDelete={isDelete}
                  isCommentUpdated={isCommentUpdated}
                  setCommentUpdated={setCommentUpdated}
                />
              )}
            </Stack>
            <Stack>
              {isCommentVisible && (
                <TextField
                  id="standard-basic"
                  placeholder="add comment..."
                  variant="standard"
                  onChange={(e) => setCommentText(e.target.value)}
                  inputRef={commentRef}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="comment send icon"
                          onClick={handleAddComment}
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Divider />
    </Stack>
  );
};
export default Posts;
