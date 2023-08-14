import { Box } from "@mui/material";
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
  isOnline:boolean | undefined,
  setMessageReceived: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const theme = useTheme();
  const [messages, setMessages] = useState<SingleMessageInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>();
  const [receivedMessage, setReceivedMessage] = useState<any>();
  const [sendMessage, setSendMessage] = useState<any>(null);
  const chatId = useSelector(selectSelectedChatId);
  const user = useSelector(selectUserId);
  const socket = useRef<Socket>();
  const { data, isLoading, isFetching, refetch } = useGetMessagesQuery({chatId,});


  useEffect(() => {
    refetch();
  }, [receivedMessage, chatId]);

  useEffect(() => {
    setMessages(data?.data ?? []);
  }, [data]);

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    socket.current.emit("new-user-add", user);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("receive-message", (data) => {
      setReceivedMessage(data);
      setMessageReceived(data?.content)
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current && socket.current.emit("send-message", sendMessage);
      setMessageReceived('')
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
      </Box>
    </Box>
  );
};
export default MessageBox;
