import { Box, Grid, Theme } from "@mui/material";
import NavBar from "../../components/User/NavBar/NavBar";
import LeftBar from "../../components/User/LeftBar/LeftBar";
import RightBar from "../../components/User/RightBar/RightBar";
import UserNotification from "../../components/User/Notification/Notification";
import { makeStyles } from "@mui/styles";
import BottomNav from "../../components/User/BottomNav/BottomNav";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../redux/Features/reducers/userAuthSlice";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { selectUserName } from "../../redux/Features/reducers/userAuthSlice";

const useStyles = makeStyles((theme: Theme) => ({
  displayManager: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  bottomDisplay: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  displayManager2: {
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}));

const Notification = () => {
  const token = useSelector(selectUserToken);
  const classes = useStyles();
  const userName = useSelector(selectUserName);
  
  if (token) {
    return (
      <Box>
        <NavBar user />
        <Grid container>
          <Grid item md={3} className={classes.displayManager}>
            <LeftBar />
          </Grid>
          <Grid item md={6} xs={12}>
            <UserNotification  />
          </Grid>
          <Grid item md={3} className={classes.displayManager2}>
            <RightBar />
          </Grid>
        </Grid>
        <Box className={classes.bottomDisplay}>
          <BottomNav />
        </Box>
      </Box>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Notification;