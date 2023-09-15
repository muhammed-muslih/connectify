import React from "react";
import {
  Stack,
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Theme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import { UserLoginInterface } from "../../../types/UserAuthInterface";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { useUserLoginMutation } from "../../../redux/Features/api/authApiSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  setUserCredentials,
  setProfilePicture,
} from "../../../redux/Features/reducers/userAuthSlice";
import { useTheme } from "@mui/material/styles";

import GoogleAuth from "./GoogleAuth";

const schema = yup.object().shape({
  userName: yup
    .string()
    .required("please enter user name ")
    .min(3, "user name must be atleast 3 characters"),
  password: yup
    .string()
    .required("please enter password ")
    .min(5, "Password must be atleast 5 characters")
    .max(15, "Password must be less than 15 characters"),
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    overflow:'hidden',
  },
  logoBox: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("lg")]: {
      display: "none",
     },
   
  },
  logoBox1: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("lg")]: {
     display: "flex",
     padding:theme.spacing(1)
    },
  },
  logoText: {
    color: theme.palette.primary.main,
    paddingBottom: theme.spacing(2),
  },
  logoIcon: {
    fontWeight: "bolder",
    color: theme.palette.primary.main,
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageBox: {
    backgroundColor: theme.palette.primary.dark,
    width: "50%",
    [theme.breakpoints.down("lg")]: {
      display: "none",
      width: "auto",
    },
  },
  image: {
    width: "100%",
    padding:10
  },
  formBox: {
    width: "50%",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  formBox2: {
    padding: theme.spacing(20),
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(5),
    },
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  form: {
    color: theme.palette.primary.light,
    marginTop: theme.spacing(5),
  },
  textField: {
    marginBottom: theme.spacing(4),
    color: "white",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  signUpLink: {
    textDecoration: "none",
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [loginError, setLoginError] = useState("");
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const submitHandler = async (
    values: UserLoginInterface,
    actions: FormikHelpers<UserLoginInterface>
  ) => {
    if (!isLoading) {
      try {
        const res = await loginUser(values).unwrap();
        if (res.status === "success") {
          dispatch(
            setUserCredentials({
              userName: values.userName,
              userToken: res.token,
              id: res._id,
            })
          );
          dispatch(
            setProfilePicture({
              profilePicture: res.profilePicture,
            })
          );
          actions.resetForm();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoginError(error.data.message);
      }
    }
  };

  const initialValues: UserLoginInterface = {
    userName: "",
    password: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      onSubmit: submitHandler,
      validationSchema: schema,
    });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack className={classes.root}>
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          boxShadow: {
            xs: 0,
            sm: "5px",
          },
        }}
      >
        <Box className={classes.contentBox}>
          <Box className={classes.imageBox}>
            <img
              src="assets/authpageimg.svg"
              alt=""
              className={classes.image}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </Box>
          <Box className={classes.formBox}>

          <Box className={classes.logoBox}>
        <Typography variant="h2" className={classes.logoText} sx={{fontWeight:'bolder'}}>
          <IconButton size="large">
            <Diversity2Icon className={classes.logoIcon} sx={{fontWeight:'bold',fontSize:60}}/>
          </IconButton>
          Connectify
        </Typography>
      </Box>

      <Box className={classes.logoBox1}>
        <Typography variant="h4" className={classes.logoText} sx={{fontWeight:'bolder'}}>
          <IconButton size="large">
            <Diversity2Icon className={classes.logoIcon} sx={{fontWeight:'bold',fontSize:30}}/>
          </IconButton>
          Connectify
        </Typography>
      </Box>
            <Box className={classes.formBox2}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.dark,
                  marginBottom: 6,
                }}
              >
                LogIn
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={4}>
                  <TextField
                    className={classes.textField}
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.userName && touched.userName ? true : false}
                    helperText={
                      errors.userName && touched.userName ? errors.userName : ""
                    }
                    name="userName"
                    label="User Name"
                    size="medium"
                    variant="filled"
                    fullWidth
                  />

                  <TextField
                    className={classes.textField}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password && touched.password ? true : false}
                    helperText={
                      errors.password && touched.password ? errors.password : ""
                    }
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    size="medium"
                    variant="filled"
                    // fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    disableRipple
                    disableElevation
                  >
                    LogIn
                  </Button>

                  <Typography
                    variant="body1"
                    sx={{ color:theme.palette.primary.light }}
                  >
                    Don't have an account?
                    <Link
                      to="/register"
                      style={{ textDecoration: "none" }}
                      className={classes.signUpLink}
                    >
                      SignUp
                    </Link>
                  </Typography>
                  <Typography variant="body1" color={"error"}>
                    {loginError}
                  </Typography>
                </Stack>
              </form>
              <div style={{display:'flex',alignItems:'center',justifyContent:"center"}}><GoogleAuth /></div>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
