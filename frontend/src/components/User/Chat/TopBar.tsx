import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Avatar, Typography, Stack, Box, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import "../NavBar/NavBar.css";
import { makeStyles } from "@mui/styles";
import {useRef } from "react";
import { Users } from "../../../types/chatInterface";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";

const useStyles = makeStyles((theme: Theme) => ({
  onlineBadge: {
    backgroundColor: theme.palette.success.main,
    borderRadius: "50%",
    width: 9,
    height: 9,
    marginRight: theme.spacing(0),
  },
  offlineBadge: {
    backgroundColor: theme.palette.error.main,
    borderRadius: "50%",
    width: 9,
    height: 9,
    marginRight: theme.spacing(0),
  },
}));

const MessageBar = ({
  selectedUserPic,
  selctedUserName,
  isOnline,
  chatId,
  users,
}: {
  selectedUserPic: string | undefined;
  selctedUserName: string;
  isOnline: boolean | undefined;
  chatId: string;
  users: Users[];
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const userID = useSelector(selectUserId);
  const user = users?.find((user) => user._id === userID);
  const callee = users?.find((user) => user._id !== userID);
  const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null);

  const videoCall = async () => {
    
    if (user&&callee) {
      console.log('hey');
      
      // generate Kit Token
      const appID = 488358319;
      const serverSecret = "b96996cabe0a1f6ca8184502e1fb401f";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        chatId,
        userID,
        user.userName
      );

      // Create instance object from Kit Token.
      zeroCloudInstance.current = ZegoUIKitPrebuilt.create(kitToken);
      // add plugin
      zeroCloudInstance.current.addPlugins({ ZIM });

      const targetUser = {
        userID: callee._id,
        userName: callee.userName + callee._id,
      };

      try {
        const res = await zeroCloudInstance.current.sendCallInvitation({
          callees: [targetUser],
          callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
          timeout: 30,
        });
        console.log(res, "video res");

        if (res.errorInvitees.length) {
          alert("The user does not exist or is offline.");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      console.log("user or callee not found");
    }
  };
  

  return (
    <Box
      p={1}
      py={2}
      px={5}
      sx={{ borderRadius: 2, borderBottom: "2px groove", background: "white" }}
      boxShadow={0}
      className="nav"
      color={theme.palette.primary.dark}
    >
      <Stack direction={"row"} spacing={2} alignItems={"end"}>
        <Avatar
          sx={{ width: 70, height: 70 }}
          src={selectedUserPic && selectedUserPic}
        ></Avatar>
        <Box>
          <Typography
            variant="h5"
            fontWeight={"bolder"}
            color={theme.palette.primary.main}
          >
            {selctedUserName && selctedUserName}
          </Typography>
          {isOnline ? (
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              online
              <span className={classes.onlineBadge} />
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              offline
              <span className={classes.offlineBadge} />
            </Typography>
          )}
        </Box>
      </Stack>
      <Stack direction={"row"} spacing={4} p={1.5}>
        <VideoCallSharpIcon
          sx={{ width: 45, height: 45, color: theme.palette.primary.main,cursor:'pointer' }}
          onClick={videoCall}
        />
      </Stack>
    </Box>
  );
};

export default MessageBar;
