import { Container, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Posts from "./Posts";
import { useGetAllPostsQuery } from "../../../redux/Features/api/postApiSlice";
import { useGetSavedPostsQuery } from "../../../redux/Features/api/userApiSlice";
import Shimmer from "./Shimmer";
import { useEffect } from "react";
import { GetAllPostInterface } from "../../../types/PostInterfaces";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = ({
  isNewPostAdded,
  setNewPostAdded,
  socket,
}: {
  isNewPostAdded: boolean;
  setNewPostAdded: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);
  const [isDelete, setDelete] = useState(false);
  const [deletedId, setDeletedId] = useState<string>();
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState<string>();
  const [editedText, setEditedText] = useState<string>();
  const [posts, setPosts] = useState<GetAllPostInterface[]>([]);
  const { data, isLoading, isFetching, refetch, error, isError } =
    useGetAllPostsQuery({
      page,
      limit,
    });
  const { data: savedPosts, isLoading: savedPostLoading} =
    useGetSavedPostsQuery();

  
  useEffect(()=>{
    if (isError) {
      if (
        (error as any).status === 403 &&
        (error as any).data?.message === "Blocked user"
      ) {
        dispatch(logoutUser());
      }
    }
  },[error])

  useEffect(() => {
    if (data && data?.posts) {
      const post = data.posts ?? [];
      if (isNewPostAdded) {
        setPosts(post);
        setNewPostAdded(false);
      } else {
        setPosts((prev) => [...new Set([...prev, ...post])]);
      }
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [isNewPostAdded]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  useEffect(() => {
    if (isDelete && deletedId) {
      setPosts((prev) => prev.filter((post) => post._id !== deletedId));
    }
  }, [isDelete]);

  useEffect(() => {
    if (isEdited && editedId && editedText) {
      setPosts((prev) =>
        prev.map((post) => {
          if (post._id.toString() === editedId) {
            return {
              ...post,
              description: editedText,
            };
          }
          return post;
        })
      );
    }
  }, [isEdited]);

  return (
    <Container className={classes.container}>
      {posts &&
        posts.map((post, index) => (
          <Posts
            _id={post._id}
            userName={post.userId?.userName}
            imageUrl={post.imageUrl}
            imageName={post.imageName}
            description={post.description}
            profilePicture={post.userId?.profilePicture}
            key={post._id + index}
            likes={post.likes}
            date={post.date}
            comments={post.comments}
            saved={savedPosts?.saved}
            postUserId={post?.userId?._id}
            setDelete={setDelete}
            setDeletedId={setDeletedId}
            setIsEdited={setIsEdited}
            setEditedId={setEditedId}
            setEditedText={setEditedText}
            socket={socket}
          />
        ))}
      {isLoading && <Shimmer />}
    </Container>
  );
};

export default Feed;
