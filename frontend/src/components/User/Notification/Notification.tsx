import { Container ,Button,Box} from "@mui/material";
import Header from "./Header";
import Contents from "./Contents";
import Shimmer from "./Shimmer";
import { useGetNotificationsQuery } from "../../../redux/Features/api/userApiSlice";
import { useEffect, useState } from "react";
import { NotificationInterface } from "../../../types/ResponseInterface";
import { setNoOfUnreadNotifications } from "../../../redux/Features/reducers/userAuthSlice";
import { useDispatch,useSelector } from "react-redux";
import { selectNoOfUnReadNotifications } from "../../../redux/Features/reducers/userAuthSlice";
import { useMarkAsReadMutation } from "../../../redux/Features/api/userApiSlice";
import { format } from "timeago.js";

const classes = {
  container: {
    paddingTop: 5,
  },
};

const Notification = ({
  newNotification,
}: {
  newNotification: NotificationInterface | undefined;
}) => {
  const dispatch = useDispatch()
  const [isReaded,setIsReaded] = useState(false)
  const noOfUnreadNotifications = useSelector(selectNoOfUnReadNotifications)
  const [markAsRead,{isLoading:isNotificationReadLoading}] = useMarkAsReadMutation()
  const { data, isLoading, refetch } = useGetNotificationsQuery();
  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  );

  useEffect(() => {
    refetch();
  }, [isReaded]);

  useEffect(() => {
    setNotifications(data?.notifications ?? []);
  }, [data]);

  useEffect(() => {
    if (newNotification) {
      setNotifications((prev) => [newNotification, ...prev]);
      dispatch(setNoOfUnreadNotifications({ unreadNotficationNumber: noOfUnreadNotifications + 1 }));
    }
  }, [newNotification]);

  useEffect(() => {
    const unreadNotifications = notifications.filter((notification) => !notification.isRead);
    const numberOfUnreadNotifications = unreadNotifications.length;
    dispatch(setNoOfUnreadNotifications({ unreadNotficationNumber: numberOfUnreadNotifications }));
  }, [notifications]);

  const markAsReadHandler = async() => { 
    if(!isNotificationReadLoading){
      try {
        const res = await markAsRead().unwrap();
        setIsReaded(true)
      } catch (error) {
        console.log(error);
      }
    }
    
  }
  return (
    <>
      <Header />
      <Box sx={{p:2}}>
      <Button variant="contained" 
      onClick={markAsReadHandler}
      sx={{mb:2,p:1,textTransform:'lowercase',position:"fixed",zIndex:1,mt:3}}> mark as read</Button>
      </Box>
      <Container sx={classes.container}>
        {isLoading ? (
          <Shimmer />
        ) : (
          notifications?.map((notification, index) => (
            <Contents
              key={notification._id + index}
              message={notification.content}
              profilePic={notification.user.profilePicture}
              userName={notification.user.userName}
              postUrl={notification?.postId && notification?.postId?.imageUrl}
              isRead={notification.isRead}
              time={format(notification.createdAt)}
            />
          ))
        )}
      </Container>
    </>
  );
};

export default Notification;
