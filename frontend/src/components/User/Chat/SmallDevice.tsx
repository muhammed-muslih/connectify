import { Box, Divider, Grid, Theme } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import UserListBar from "./ChatList";
import BottomNav from "../BottomNav/BottomNav";
import { useState } from "react";
import { Users } from "../../../types/chatInterface";
import MessageBox from "./MessageBox";
import { selectSelectedChatId } from "../../../redux/Features/reducers/userAuthSlice";
import { useSelector } from "react-redux";


const MessageSmallDevice = () => {
  const [selctedUserName, setSelectedUserName] = useState<string>("");
  const [showMessage, setShowMessage] = useState(false);
  const [selectedUserPic, setSelectedUserPic] = useState<string | undefined>( "");
  const [isMessageReceived, setMessageReceived] = useState<string>('')
  const [users, setUsers] = useState<Users[]>();
  const [isOnline, setOnline] = useState<boolean>();
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string; socketId: string }[]>([]);

  return (
    <Box>
      <NavBar user />
      <Grid container>
        {!showMessage && (
          <Grid item  xs={12}>
            <Box onClick={()=>setShowMessage(true)}>
            <UserListBar
              setSelectedUserName={setSelectedUserName}
              setSelectedUserPic={setSelectedUserPic}
              setUsers={setUsers}
              onlineUsers={onlineUsers}
              setOnline={setOnline}
             isMessageReceived={isMessageReceived}
            />
            </Box>
          </Grid>
        )}

          <Grid item xs={12}>
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
      <BottomNav setShowMessage={setShowMessage}/>
    </Box>
  );
};

export default MessageSmallDevice;
