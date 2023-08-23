import {
  TextField,
  Theme,
  Box,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useUserSearchMutation } from "../../../redux/Features/api/userApiSlice";
import { green, blue, red, orange, purple } from "@mui/material/colors";
import { UserInerface } from "../../../types/UserInterfaces";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(16),
    [theme.breakpoints.down("xl")]: {
      display: "none",
    },
    position: "sticky",
    top: 0,
  },
  text: {
    color: theme.palette.primary.dark,
    fontWeight: "bolder",
  },
  displyClass: {},
}));

const getRandomColor = () => {
  const colors = [green[500], blue[500], red[500], orange[500], purple[500]];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const RightBar = () => {
  const dispatch = useDispatch()
  const classess = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [search, { isLoading, isSuccess, isError }] = useUserSearchMutation();
  const [users, setUsers] = useState<UserInerface[]>([]);
  const searchHandler = async () => {
    try {
      const result = await search({ searchValue }).unwrap();
      if (result.status === "success") {
        setUsers(result.users);
      }
    } catch (error:any) {
      if (error.status === 403 && error .data?.message === "Blocked user") {
        dispatch(logoutUser());
      }else{
        console.log(error);
        toast.error("something went wrong");
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
    if (id) {
      navigate(`/profile/${id}`);
    }
  };

  return (
    <Box className={classess.container} sx={{ borderLeft: "3px groove" }}>
      <Toaster position={"top-right"} />
      <Box px={10} sx={{position:"fixed"}}>
        <TextField
          id="outlined-search"
          label="find friends..."
          type="find"
          fullWidth
          autoComplete="off"
          value={searchValue}
          sx={{ borderColor: theme.palette.primary.light,}}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </Box>
      <Box p={5} ml={5} mt={2}>
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
  );
};

export default RightBar;
