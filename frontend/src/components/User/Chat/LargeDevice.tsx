import { Box, Grid } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import LeftBar from "../LeftBar/LeftBar";
import UserListBar from "./ChatList";
import MessageBox from "./MessageBox";
import { useState } from "react";
import { Users } from "../../../types/chatInterface";


const MessageLargeDevice = () => {
  const [selctedUserName, setSelectedUserName] = useState<string>("");
  const [selectedUserPic, setSelectedUserPic] = useState<string | undefined>( "");
  const [onlineUsers, setOnlineUsers] = useState< { userId: string; socketId: string }[]>([]);
  const [isMessageReceived, setMessageReceived] = useState<string>('')
  const [isOnline, setOnline] = useState<boolean>();
  const [users, setUsers] = useState<Users[]>();
  
  return (
    <Box>
      <NavBar user />
      <Grid container>
        <Grid item md={1}>
          <LeftBar message />
        </Grid>
        <Grid item md={2.5}>
          <UserListBar
            setSelectedUserName={setSelectedUserName}
            setSelectedUserPic={setSelectedUserPic}
            setUsers={setUsers}
            onlineUsers={onlineUsers}
            setOnline={setOnline}
            isMessageReceived={isMessageReceived}
          />
        </Grid>
        <Grid item md={8.5}>
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
    </Box>
  );
};

export default MessageLargeDevice;
