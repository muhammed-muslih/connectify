import * as React from "react";
import { Avatar, Stack, Box, Theme, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useGetSinglePostDetailsQuery } from "../../../redux/Features/api/postApiSlice";
import { useSelector } from "react-redux";
import {
  selectUserName,
  selectUserProfilePic,
} from "../../../redux/Features/reducers/userAuthSlice";
import { makeStyles } from "@mui/styles";
import Posts from "../Feed/Posts";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  comment: {
    height: 730,
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    overflowY: "scroll",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SinglePost = ({
  handleClose,
  open,
  setOpen,
  postId,
}: {
  handleClose: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
}) => {
  const classes = useStyles();
  const currentUserName = useSelector(selectUserName);
  const currentUserProfile = useSelector(selectUserProfilePic);
  const [isDelete, setDelete] = useState(false);
  const [deletedId, setDeletedId] = useState<string>();
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState<string>();
  const [editedText, setEditedText] = useState<string>();
  const { data, isLoading, isFetching, refetch } = useGetSinglePostDetailsQuery(
    {
      postId,
    }
  );
  useEffect(() => {
    refetch();
  }, []);
 

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              close
            </Typography>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Avatar src={currentUserProfile && currentUserProfile} />
              <Typography sx={{ fontWeight: "bolder" }}>
                {currentUserName}
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>

        <Stack direction={"row"} justifyContent={"center"} mt={4}>
          <Box>
            <Posts
              _id={data?.post._id}
              userName={data?.post.userId?.userName}
              imageUrl={data?.post.imageUrl}
              imageName={data?.post.imageName}
              description={data?.post.description}
              profilePicture={data?.post.userId?.profilePicture}
              key={data?.post._id}
              likes={data?.post.likes}
              date={data?.post.date}
              comments={data?.post.comments}
              postUserId={data?.post.userId?._id}
              singlePost
              setDelete={setDelete}
              setDeletedId={setDeletedId}
              setIsEdited={setIsEdited}
              setEditedId={setEditedId}
              setEditedText={setEditedText}
              isVerified = {data?.post.userId.verified.isVerified??false}
            />
          </Box>
        </Stack>
      </Dialog>
    </div>
  );
};

export default SinglePost;
