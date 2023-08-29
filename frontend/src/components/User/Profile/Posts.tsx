import { ImageList, ImageListItem, Box, Theme, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PostCardInterface } from "../../../types/PropsInterfaces";
import SinglePost from "../Modal/SinglePost";
import { useState } from "react";


const useStyles = makeStyles((theme: Theme) => ({
  box1: {
    display: "block",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
  box2: {
    display: "none",
    [theme.breakpoints.down("lg")]: {
      display: "block",
    },
  },
}));

const Posts: React.FC<PostCardInterface> = ({ posts }) => {
  const classes = useStyles();
  const [postId,setPostId] = useState<string>('')
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id:string) => {
    setPostId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPostId('')
  };

  return (
    <Box>
      {/* large devices */}
      <Box className={classes.box1}>
        <Divider sx={{ mt: 1 }} />
        <ImageList
          sx={{ width: "100%", overflow: "Hidden" }}
          cols={3}
          gap={6}
          rowHeight={400}
        >
          {posts
            ? posts.map((post) => (
                <ImageListItem key={post._id} sx={{ pb: 9.5 }} onClick={()=>handleClickOpen(post._id)}>
                  <img
                    width={"100%"}
                    height={"400px"}
                    src={`${post.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${post.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))
            : ""}
        </ImageList>
      </Box>

      {/* small devices */}
      {
        open&&postId&&<SinglePost  handleClose={handleClose} open={open} setOpen={setOpen} postId={postId}/>
      }

      <Box className={classes.box2}>
        <ImageList sx={{ width: "100%" }} cols={2} gap={0} rowHeight={350}>
          {posts
            ? posts.map((post) => (
                <ImageListItem key={post._id} sx={{ borderRadius: 10 }}>
                  <img
                    src={post.imageUrl}
                    srcSet={post.imageUrl}
                    loading="lazy"
                  />
                </ImageListItem>
              ))
            : ""}
        </ImageList>
      </Box>
    </Box>
  );
};

export default Posts;
