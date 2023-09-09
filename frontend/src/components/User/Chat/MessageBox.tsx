import { Box, Typography } from "@mui/material";
import MessageBar from "./TopBar";
import { useTheme } from "@mui/material/styles";
import BottomBar from "./BottomBar";
import MessageTexts from "./MessageTexts";
import { useGetMessagesQuery } from "../../../redux/Features/api/messageApiSlice";
import { useEffect, useState } from "react";
import { SingleMessageInterface } from "../../../types/messageInterface";
import { useSelector } from "react-redux";
import { selectSelectedChatId } from "../../../redux/Features/reducers/userAuthSlice";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { Users } from "../../../types/chatInterface";
import { Link } from "react-router-dom";
import socket from "../../../socket";
import { useGetSingleChatQuery } from "../../../redux/Features/api/chatApiSlice";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";
import { useDispatch } from "react-redux";

const MessageBox = ({
  selectedUserPic,
  selctedUserName,
  users,
  setOnlineUsers,
  isOnline,
  setMessageReceived,
}: {
  selectedUserPic: string | undefined;
  selctedUserName: string;
  users: Users[] | undefined;
  setOnlineUsers: React.Dispatch<
    React.SetStateAction<{ userId: string; socketId: string }[]>
  >;
  isOnline: boolean | undefined;
  setMessageReceived: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const theme = useTheme();
  const [messages, setMessages] = useState<SingleMessageInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>();
  const [chatUsers, setChatUsers] = useState<Users[]>([]);
  const [receivedMessage, setReceivedMessage] = useState<any>();
  const [sendMessage, setSendMessage] = useState<any>(null);
  const chatId = useSelector(selectSelectedChatId);
  const user = useSelector(selectUserId);
  const dispatch = useDispatch();

  const { data, isLoading, isFetching, refetch ,isError,error} = useGetMessagesQuery({
    chatId,
  });
  const { data: result, refetch: singelChat } = useGetSingleChatQuery({
    chatId,
  });

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
    if (chatId) {
      refetch();
    }
  }, [receivedMessage, chatId]);

  useEffect(() => {
    setMessages(data?.data ?? []);
  }, [data]);

  useEffect(() => {
    if (result?.chat) {
      setChatUsers(result?.chat?.users ?? []);
    }
  }, [result]);

  useEffect(() => {
    if (chatId) {
      singelChat();
    }
  }, [chatId]);


  useEffect(() => {
    socket.emit("new-user-add", user);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("receive-message", (data) => {
      setReceivedMessage(data);
      setMessageReceived(data?.content);
    });
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket && socket.emit("send-message", sendMessage);
      setMessageReceived("");
    }
  }, [sendMessage]);

  useEffect(() => {
    refetch();
  }, [chatId, receivedMessage]);

  useEffect(() => {
    setMessages(data?.data ?? []);
  }, [data]);

  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId.toString() === chatId) {
      receivedMessage.createdAt = Date.now();
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [receivedMessage, chatId]);

  return (
    <Box
      sx={{
        px: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          mt: 10,
          border: "3px groove",
          borderRadius: 2,
          flexGrow: 1,
          backgroundColor: "whitesmoke",
        }}
      >
        {chatId && (
          <>
            <MessageBar
              selectedUserPic={selectedUserPic}
              selctedUserName={selctedUserName}
              isOnline={isOnline}
              chatId={chatId} users={chatUsers}
              
            />
            <MessageTexts messages={messages} />
            <BottomBar
              selectedChatId={chatId}
              setNewMsg={setNewMessage}
              setSendMessage={setSendMessage}
              users={chatUsers}
            />
          </>
        )}

        {!chatId && messages.length <= 0 && (
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              height: "90vh",
              flexDirection: "column",
              color: theme.palette.primary.main,
            }}
          >
            <img src="assets/Online world-pana.svg" alt="" width={"50%"} />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Start your chatting journey today. Connect with friends and make
              new ones.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Go to <Link to={"/"}>home</Link> &gt; search your friends and make
              chat
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Experience the joy of meaningful conversations and connections.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Let's chat away!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default MessageBox;
