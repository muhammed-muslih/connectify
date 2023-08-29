import * as React from "react";
import { Avatar, Stack, Box, Theme, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSelector } from "react-redux";
import {
  selectUserName,
  selectUserProfilePic,
} from "../../../redux/Features/reducers/userAuthSlice";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useState } from "react";
import SubScriptionCard from "./SubscriptionCard";

const useStyles = makeStyles((theme: Theme) => ({
  comment: {
    height: 730,
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    overflowY: "scroll",
  },
  boxContainer : {
    display: "flex",
    flexDirection: "row",
    marginTop:20,
    padding:10,
    justifyContent: "space-around",
    [theme.breakpoints.down("lg")] : {
      flexDirection: "column",
    }
  }
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentModal = ({
  handleClose,
  open,
  setOpen,
}: {
  handleClose: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const classes = useStyles();
  const currentUserName = useSelector(selectUserName);
  const currentUserProfile = useSelector(selectUserProfilePic);

  const oneMonthCardContent ='Elevate your Connectify experience with our 1-month verified subscription. The distinguished verification tick icon next to your name adds an extra layer of authenticity to your Connectify profile. Build trust and stand out in the Connectify community as you enjoy premium features and exclusive content.'
  const sixMonthCardContent ="Take your credibility on Connectify to new heights with our 6-month verified subscription. The coveted verification tick icon will be prominently displayed, solidifying your identity and boosting your reputation within the Connectify network. Unleash the power of Connectify's top-tier offerings while showcasing your verified status."
  const oneYearCardContent ='Secure a full year of verified excellence within the Connectify community with our premium subscription. The prestigious verification tick icon will accompany your name, broadcasting your authenticity and trustworthiness to fellow Connectify members. Immerse yourself in exclusive Connectify content and advanced features, all while proudly displaying your verified status.'
  
  
  

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              close
            </Typography>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Avatar src={currentUserProfile && currentUserProfile} />
              <Typography sx={{ fontWeight: "bolder" }}>
                {currentUserName}
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box className={classes.boxContainer}>
          <SubScriptionCard duration="1 month" amount={600} content={oneMonthCardContent} title="1 Month Subscription"/>
          <SubScriptionCard duration="1 month" amount={2000} content={sixMonthCardContent} title="6 Month Subscription"/>
          <SubScriptionCard duration="1 month" amount={5000} content={oneYearCardContent} title="1 Year Subscription"/>
        </Box>
      </Dialog>
    </div>
  );
};

export default PaymentModal;