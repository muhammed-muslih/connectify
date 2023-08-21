import { Avatar, Typography, Stack, Theme, Box,Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  onlineBadge: {
    backgroundColor: theme.palette.success.main,
    borderRadius: "50%",
    width: 15,
    height: 15,
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]:{
      width:9,
      height:9
    }
  },
}));

const Contents = ({
  message,
  userName,
  profilePic,
  postUrl,
  time,
  isRead,
}: {
  message: string;
  userName: string;
  profilePic: string;
  postUrl?: string;
  time: string;
  isRead: boolean;
}) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between",mt:3}}>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ alignItems: "center"}}
        >
          <Avatar sx={{ width: 50, height: 50 }} src={profilePic} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bolder", color: theme.palette.primary.dark }}
          >
            {userName}
          </Typography>
          <Typography
            sx={{ fontWeight:{
              md:'bolder'
            }, color: theme.palette.primary.main }}
          >
            {message}
          </Typography>
          {postUrl && (
            <img src={postUrl} alt="" width={"55px"} height={"55px"} />
          )}
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            alignItems: "center",
            backgroundColor: "whitesmoke",
            p: 2,
          }}
        >
          <Typography   sx={{ color: theme.palette.primary.main }}>
            {time}
          </Typography>
          {!isRead&&<Box className={classes.onlineBadge} ></Box>}
        </Stack>
      </Box>
    </>
  );
};

export default Contents;
