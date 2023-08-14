import { Avatar, Typography, Stack, Box,Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcCallSharpIcon from "@mui/icons-material/AddIcCallSharp";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import "../NavBar/NavBar.css";
import { makeStyles } from "@mui/styles";


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
}: {
  selectedUserPic: string | undefined;
  selctedUserName: string;
  isOnline:boolean | undefined
}) => {
  const theme = useTheme();
  const classes = useStyles();

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
        {
        isOnline?
        <Typography  variant="body2" sx={{display:'flex',alignItems:"center"}}>online
        <span className={classes.onlineBadge}/>
        </Typography>
        :
        
        <Typography variant="body2" sx={{display:'flex',alignItems:"center"}}>offline
        <span className={classes.offlineBadge}/>
        </Typography>
        }
        </Box>
      </Stack>
      <Stack direction={"row"} spacing={4} p={1.5}>
        <AddIcCallSharpIcon
          sx={{ width: 45, height: 45, color: theme.palette.primary.main }}
        />
        <VideoCallSharpIcon
          sx={{ width: 45, height: 45, color: theme.palette.primary.main }}
        />
      </Stack>
    </Box>
  );
};

export default MessageBar;
