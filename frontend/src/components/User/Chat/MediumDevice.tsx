import { Box, Divider, Grid, Theme } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import UserListBar from "./ChatList";
import BottomNav from "../BottomNav/BottomNav";
import MessageBox from "./MessageBox";
import { useState } from "react";
import { Users } from "../../../types/chatInterface";
import { selectSelectedChatId } from "../../../redux/Features/reducers/userAuthSlice";
import { useSelector } from "react-redux";


const MessageMediumDevice = () => {
  const [selctedUserName, setSelectedUserName] = useState<string>("");
  const [selectedUserPic, setSelectedUserPic] = useState<string | undefined>("");
  const [users, setUsers] = useState<Users[]>();
  const [isMessageReceived, setMessageReceived] = useState<string>('')
  const [isOnline, setOnline] = useState<boolean>();
  const [onlineUsers, setOnlineUsers] = useState<
    { userId: string; socketId: string }[]
  >([]);

  return (
    <Box>
      <NavBar user />
      <Grid container>
        <Grid item md={3}>
          <UserListBar
            setSelectedUserName={setSelectedUserName}
            setSelectedUserPic={setSelectedUserPic}
            setUsers={setUsers}
            onlineUsers={onlineUsers}
            setOnline={setOnline}
            isMessageReceived={isMessageReceived}
          />
        </Grid>
        <Grid item md={9}>
          <MessageBox
            selectedUserPic={selectedUserPic}
            selctedUserName={selctedUserName}
            users={users}
            setOnlineUsers={setOnlineUsers}
            isOnline={isOnline}
            setMessageReceived={setMessageReceived}
          />
        </Grid>
      </Grid>
      <BottomNav />
    </Box>
  );
};

export default MessageMediumDevice;
