import { Theme, Box, Avatar, Stack, Typography, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import MessageIcon from "@mui/icons-material/Message";
import { useGetAllChatsQuery } from "../../../redux/Features/api/chatApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { useDispatch } from "react-redux";
import { setSelectedChatId as setChatId } from "../../../redux/Features/reducers/userAuthSlice";
import { GetSingleChatInterface } from "../../../types/chatInterface";
import { selectSelectedChatId } from "../../../redux/Features/reducers/userAuthSlice";
import { Users } from "../../../types/chatInterface";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    height: "92.7vh", // Adjust as needed
    overflow: "hidden",
    display: "flex",
    borderRight: `3px solid ${theme.palette.divider}`,
  },
  text: {
    fontWeight: "bold",
  },
  boxStyle: {
    borderBottom: `3px solid ${theme.palette.divider}`,
    alignItems: "center",
    borderRadius: 8,
    cursor: "pointer",
    padding: theme.spacing(2),
  },
  scrollContent: {
    flex: "1",
    overflowY: "scroll",
  },
  onlineBadge: {
    backgroundColor: theme.palette.success.main,
    borderRadius: "50%",
    width: 10,
    height: 10,
    marginRight: theme.spacing(1),
  },
  offlineBadge: {
    backgroundColor: theme.palette.error.main,
    borderRadius: "50%",
    width: 10,
    height: 10,
    marginRight: theme.spacing(1),
  },
  whiteBadge: {
    backgroundColor: "white",
    borderRadius: "50%",
    width: 10,
    height: 10,
    marginRight: theme.spacing(1),
  },
  messageBox: {
    backgroundColor: "white",
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.light,
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Align to center horizontally
    gap: theme.spacing(1),
    "& svg": {
      fontSize: theme.typography.fontSize * 1.5,
    },
  },
  stackContainer: {
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const UserListBar = ({
  setSelectedUserName,
  setSelectedUserPic,
  setUsers,
  onlineUsers,
  setOnline,
  isMessageReceived,
}: {
  setSelectedUserName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedUserPic: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUsers: React.Dispatch<React.SetStateAction<Users[] | undefined>>;
  onlineUsers: { userId: string; socketId: string }[];
  setOnline: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  isMessageReceived: string;
}) => {
  const classes = useStyles();
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = scrollableRef.current;
    if (element) {
      element.scrollTop += event.deltaY;
    }
  };
  const selectedChatId = useSelector(selectSelectedChatId);

  const currentUserId = useSelector(selectUserId);
  const { data, isLoading, isFetching, refetch,isError,error } = useGetAllChatsQuery();
  useEffect(() => {
    refetch();
  }, []);

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
    if (data?.chats.length && data?.chats.length > 0) {
      setOnline(checkUserOnlineStatus(data.chats[0]));
      dispatch(setChatId({ chatId: data.chats[0]._id }));
      setSelectedUserName(
        data?.chats[0].users[0]._id.toString() === currentUserId
          ? data?.chats[0].users[1].userName ?? ""
          : data?.chats[0].users[0].userName ?? ""
      );
      setSelectedUserPic(
        data?.chats[0].users[0]._id.toString() === currentUserId
          ? data?.chats[0].users[1].profilePicture ?? ""
          : data?.chats[0].users[0].profilePicture ?? ""
      );
      setUsers(data?.chats[0].users);
    }
  }, [data]);

  const handleSetDatas = (chat: GetSingleChatInterface) => {
    setOnline(checkUserOnlineStatus(chat));
    setUsers(chat.users);
    console.log(chat.users,'chat.users');
    
    dispatch(setChatId({ chatId: chat?._id }));
    setSelectedUserName(
      chat.users[0]._id.toString() === currentUserId
        ? chat.users[1].userName
        : chat.users[0].userName
    );
    setSelectedUserPic(
      chat.users[0]._id === currentUserId
        ? chat.users[1].profilePicture
        : chat.users[0].profilePicture
    );
  };

  const checkUserOnlineStatus = (chat: GetSingleChatInterface) => {
    const chatMember = chat.users.find((user) => user._id !== currentUserId);
    if (chatMember) {
      const online = onlineUsers.find((user) => user.userId == chatMember._id);
      return online ? true : false;
    }
    return false;
  };

  return (
    <Box
      className={classes.container}
      onWheel={handleScroll}
      ref={scrollableRef}
    >
      <Box className={classes.scrollContent}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backgroundColor: "white",
          }}
          className={classes.stackContainer}
        >
          <Box className={classes.messageBox}>
            <MessageIcon
              sx={{ color: theme.palette.primary.main, width: 40, height: 40 }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color={theme.palette.primary.main}
            >
              Send a message
            </Typography>
          </Box>
        </Stack>
        <Box>
          {isLoading || isFetching ? (
            <>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item}>
                  <Stack
                    direction="row"
                    spacing={2}
                    mt={2}
                    px={2}
                    py={1.5}
                    className={classes.boxStyle}
                  >
                    <Skeleton variant="circular" width={50} height={48} />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width="100%"
                      height={75}
                    />
                  </Stack>
                </div>
              ))}
            </>
          ) : null}
        </Box>

        <Box>
          {!isLoading &&
            !isFetching &&
            data?.chats.map((chat) => (
              <Stack
                direction={"row"}
                spacing={2}
                mt={2}
                px={2}
                py={1.5}
                className={classes.boxStyle}
                key={chat?._id}
                onClick={() => handleSetDatas(chat)}
                sx={{
                  backgroundColor:
                    chat?._id.toString() === selectedChatId
                      ? theme.palette.primary.main
                      : "white",
                }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "50%",
                  }}
                  src={
                    chat?.users[0]?._id === currentUserId
                      ? chat.users[1].profilePicture
                      : chat.users[0].profilePicture
                  }
                />
                <Box>
                  <Stack direction={"row"} alignItems="center" spacing={1}>
                    <Typography
                      variant="h6"
                      fontWeight={"bold"}
                      className={classes.text}
                      sx={{
                        color:
                          chat?._id.toString() === selectedChatId
                            ? "white"
                            : "",
                      }}
                    >
                      {chat?.users[0]?._id.toString() === currentUserId
                        ? chat.users[1].userName
                        : chat.users[0].userName}
                    </Typography>
                    {checkUserOnlineStatus(chat) ? (
                      <div className={classes.onlineBadge} />
                    ) : (
                      <div className={classes.offlineBadge} />
                    )}
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        chat?._id.toString() === selectedChatId ? "white" : "",
                    }}
                  >
                    {isMessageReceived
                      ? isMessageReceived
                      : chat?.latestMessage?.content || "No messages yet"}
                  </Typography>
                </Box>
              </Stack>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserListBar;
