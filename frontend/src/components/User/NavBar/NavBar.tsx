import './NavBar.css';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Stack,
  TextField,
  Box,
  InputAdornment
} from "@mui/material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/Features/reducers/userAuthSlice";
import { selectUserProfilePic } from "../../../redux/Features/reducers/userAuthSlice";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useUserSearchMutation } from "../../../redux/Features/api/userApiSlice";
import { green, blue, red, orange, purple } from "@mui/material/colors";
import { UserInerface } from "../../../types/UserInterfaces";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";
import ClearIcon from '@mui/icons-material/Clear';

const getRandomColor = () => {
  const colors = [green[500], blue[500], red[500], orange[500], purple[500]];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const NavBar = ({ user, admin }: { user?: any; admin?: any }) => {
  const userName = useSelector(selectUserName);
  const userProfilePic = useSelector(selectUserProfilePic);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleClearSearch = () => {
    setSearchValue('')
    setIsFocused(false);

  };
  const [search, { isLoading, isSuccess, isError }] = user ? useUserSearchMutation()
  : [null, { isLoading: false, isSuccess: false, isError: false }];
  const [users, setUsers] = useState<UserInerface[]>([]);
  const searchHandler = async () => {
    if(user&&search){
      try {
        const result = await search({ searchValue }).unwrap();
        if (result.status === "success") {
          setUsers(result.users);
        }
      } catch (error: any) {
        if (error.status === 403 && error.data?.message === "Blocked user") {
          dispatch(logoutUser());
        } else {
          console.log(error);
          toast.error("something went wrong");
        }
      }

    }
  };

  useEffect(() => {
    searchHandler();
    if (!searchValue) {
      setUsers([]);
    }
  }, [searchValue]);

  const handleNavigate = (id: string) => {
    setIsFocused(false)
    if (id) {
      navigate(`/profile/${id}`);
    }
  };

  return (
    <>
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
                onFocus={handleFocus}
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
                type="text"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchValue && (
                        <ClearIcon
                          onClick={handleClearSearch}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
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
              >
                {user ? userName.split("")[0] : ""}
              </Avatar>
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
      {isFocused && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            top: 60,
            backgroundColor: "white",
            display: "flex",
            width: "100%",
            boxShadow: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box p={1}>
            {users.map((user) => (
              <Stack
                direction={"row"}
                sx={{ alignItems: "center", cursor: "pointer" }}
                spacing={1}
                mt={2}
                key={user._id}
                onClick={() => handleNavigate(user._id)}
              >
                <Avatar sx={{ bgcolor: getRandomColor() }}>
                  {user.userName[0]}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                >
                  {user.userName}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default NavBar;
