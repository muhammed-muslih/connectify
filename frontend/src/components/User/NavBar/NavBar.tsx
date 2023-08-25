import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Stack,
  TextField,
} from "@mui/material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import "./NavBar.css";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/Features/reducers/userAuthSlice";
import { selectUserProfilePic } from "../../../redux/Features/reducers/userAuthSlice";

const NavBar = ({ user, admin }: { user?: any; admin?: any }) => {
  const userName = useSelector(selectUserName);
  const userProfilePic = useSelector(selectUserProfilePic);

  return (
    <AppBar position="fixed">
      <Toolbar className="nav">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "white",
            mx: 6,
            display: {
              xs: "none",
              md: "none",
              lg: "block",
            },
          }}
        >
          <IconButton size="large">
            <Diversity2Icon
              sx={{ fontSize: 50, fontWeight: "bolder", color: "white" }}
            />
          </IconButton>
          Connectify
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: {
              xs: 20,
              sm: 26,
              md: 32,
            },
            mx: 4,
            display: {
              lg: "none",
            },
          }}
        >
          <IconButton size="medium">
            <Diversity2Icon
              sx={{
                fontSize: { xs: 32, sm: 36, md: 40 },
                fontWeight: "bolder",
                color: "white",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "none",
                },
              }}
            />
          </IconButton>
          Connectify
        </Typography>

        {user && (
          <Stack>
            <TextField
              id="outlined-search"
              variant="standard"
              sx={{
                borderColor: "white",
                bgcolor: "white",
                borderRadius: 1,
                width: {
                  xs: "90%",
                  sm: "90%",
                  md: "1000",
                  lg: "100%",
                },
                display: {
                  xl: "none",
                },
              }}
              type="search"
            />
          </Stack>
        )}

        <Stack
          className="icon"
          marginRight={{
            xs: 1,
            sm: 2,
            md: 6,
            lg: 8,
          }}
          spacing={2}
          direction={"row"}
        >
          {userProfilePic ? (
            <Avatar
              alt="profilePic"
              sx={{
                width: {
                  lg: 60,
                  sm: 40,
                  md: 50,
                  xs: 30,
                },
                height: {
                  lg: 60,
                  sm: 40,
                  md: 50,
                  xs: 30,
                },
              }}
              src={userProfilePic}
            />
          ) : (
            <Avatar
              alt="profilePic"
              sx={{
                width: {
                  lg: 60,
                  sm: 40,
                  md: 50,
                  xs: 30,
                },
                height: {
                  lg: 60,
                  sm: 40,
                  md: 50,
                  xs: 30,
                },
              }}
             
            >{user ? userName.split('')[0] : ''}</Avatar>
          )}
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                lg: 18,
                md: 16,
                sm: 14,
                xs: 12,
              },
            }}
          >
            {user && userName ? userName : "Admin"}{" "}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
