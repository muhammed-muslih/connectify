import { Box, Typography } from "@mui/material";
import MessageBar from "./TopBar";
import { useTheme } from "@mui/material/styles";
import BottomBar from "./BottomBar";
import MessageTexts from "./MessageTexts";
import { useGetMessagesQuery } from "../../../redux/Features/api/messageApiSlice";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { SingleMessageInterface } from "../../../types/messageInterface";
import { useSelector } from "react-redux";
import { selectSelectedChatId } from "../../../redux/Features/reducers/userAuthSlice";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { useRef } from "react";
import { Users } from "../../../types/chatInterface";
import { Link } from "react-router-dom";
import socket from "../../../socket";



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
  const [receivedMessage, setReceivedMessage] = useState<any>();
  const [sendMessage, setSendMessage] = useState<any>(null);
  const chatId = useSelector(selectSelectedChatId);
  const user = useSelector(selectUserId);
  // const socket = useRef<Socket>();
  const { data, isLoading, isFetching, refetch } = useGetMessagesQuery({
    chatId,
  });
  

  useEffect(() => {
    if(chatId){
    refetch();
    }
  }, [receivedMessage, chatId]);

  useEffect(() => {
    setMessages(data?.data ?? []);
  }, [data]);

  useEffect(() => {
    socket.emit("new-user-add", user);
    socket.on("get-users", (users) => {
      console.log(users,'online users');
      
      setOnlineUsers(users);
    });

    socket.on("receive-message", (data) => {
      setReceivedMessage(data);
      console.log(data);
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
            />
            <MessageTexts messages={messages} />
            <BottomBar
              selectedChatId={chatId}
              setNewMsg={setNewMessage}
              setSendMessage={setSendMessage}
              users={users}
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
            <img src='/Online world-pana.svg' alt="" width={"50%"} />
            <Typography variant="body1" sx={{fontWeight:'bold'}}>
              Start your chatting journey today. Connect with friends and make
              new ones.
            </Typography>
            <Typography variant="body1" sx={{fontWeight:'bold'}}>
              Go to <Link to={'/'}>home</Link> &gt; search your friends and make chat
            </Typography>
            <Typography variant="body1" sx={{fontWeight:'bold'}}>
              Experience the joy of meaningful conversations and connections.
            </Typography>
            <Typography variant="body1" sx={{fontWeight:'bold'}}>Let's chat away!</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default MessageBox;
