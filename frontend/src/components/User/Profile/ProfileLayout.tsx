import { Container, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProfileSection from "./ProfileSection";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserPostsQuery } from "../../../redux/Features/api/postApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { useGetSavedPostDetailsQuery } from "../../../redux/Features/api/userApiSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(12),
  },
}));

const Profile = () => {
  const [isUserPost, setUserPost] = useState<boolean>(true);
  const [isCurrentUser, setCurrentUser] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector(selectUserId);
  useEffect(() => {
    if (id && id === currentUser) {
      setCurrentUser(true);
    }
  }, []);
 
  const { data: posts, isLoading, isFetching,isError,error } = useGetUserPostsQuery({ id });
  const { data: saved, isLoading: savedPostLoading,isError:isSavedPostError,error:savedError } = useGetSavedPostDetailsQuery();
  const classes = useStyles();
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
  useEffect(()=>{
    if (isSavedPostError) {
      if (
        (savedError as any).status === 403 &&
        (savedError as any).data?.message === "Blocked user"
      ) {
        dispatch(logoutUser());
      }
    }
  },[savedError])

  return (
    <Container className={classes.container}>
      <ProfileSection
        isUserPost={isUserPost}
        setUserPost={setUserPost}
        userId={id}
        isCurrentUser={isCurrentUser}
        setCurrentUser={setCurrentUser}
        noOfPosts={posts?.posts.length}
      />
      {isUserPost ? (
        <Posts posts={posts?.posts} />
      ) : (
        isCurrentUser && <Posts posts={saved?.posts} />
      )}
    </Container>
  );
};

export default Profile;
