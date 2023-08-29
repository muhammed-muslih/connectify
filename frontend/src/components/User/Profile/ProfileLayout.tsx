import { Container, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProfileSection from "./ProfileSection";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useGetUserPostsQuery } from "../../../redux/Features/api/postApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { useGetSavedPostDetailsQuery } from "../../../redux/Features/api/userApiSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";
import Shimmer from "./Shimmer";
import { Toaster, toast } from "react-hot-toast";
import { useVerifyPaymentMutation } from "../../../redux/Features/api/userApiSlice";
import SuccessModal from "../Modal/PaymentSuccess";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(12),
  },
}));

const Profile = () => {
  const [isUserPost, setUserPost] = useState<boolean>(true);
  const [isCurrentUser, setCurrentUser] = useState<boolean>(false);
  const [openSuccessModal, setSuccessModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUserId);
  const queryString = location.search;

  useEffect(() => {
    if (id && id === currentUser) {
      setCurrentUser(true);
    }
  }, []);

  const [verifyPayment] = useVerifyPaymentMutation();

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetUserPostsQuery({ id });
  const {
    data: saved,
    isLoading: savedPostLoading,
    isError: isSavedPostError,
    error: savedError,
  } = useGetSavedPostDetailsQuery();
  const classes = useStyles();

  useEffect(() => {
    if (isError) {
      if (
        (error as any).status === 403 &&
        (error as any).data?.message === "Blocked user"
      ) {
        dispatch(logoutUser());
      }
    }
  }, [error]);

  useEffect(() => {
    if (isSavedPostError) {
      if (
        (savedError as any).status === 403 &&
        (savedError as any).data?.message === "Blocked user"
      ) {
        dispatch(logoutUser());
      }
    }
  }, [savedError]);

  const searchParams = new URLSearchParams(queryString);
  const paramValue = searchParams.get("sessionId");

  useEffect(() => {
    const verify = async() => {
      if (paramValue) {
        try {
          const res: any = await verifyPayment({ sessionId: paramValue })
          
          if (
            res.data.status === "success" &&
            res.data.message === "payment successfull"
          ) {
            navigate(`/profile/${currentUser}`);
            setSuccessModal(true);
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    verify()
  }, [paramValue]);

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
  };

  return (
    <>
      <Container className={classes.container}>
        <Toaster position="top-right" reverseOrder={false} />
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
        {isLoading && <Shimmer />}
      </Container>
      {openSuccessModal && (
        <SuccessModal
          open={openSuccessModal}
          handleModalClose={handleCloseSuccessModal}
        />
      )}
    </>
  );
};

export default Profile;
