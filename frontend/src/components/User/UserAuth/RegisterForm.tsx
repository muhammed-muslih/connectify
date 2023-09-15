import { useState, useRef, useEffect } from "react";
import {
  Stack,
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Theme
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik, FormikHelpers } from "formik";
import { UserRegisterInterface } from "../../../types/UserAuthInterface";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { useUserRegisterMutation } from "../../../redux/Features/api/authApiSlice";
import {
  setUserCredentials,
  setProfilePicture,
} from "../../../redux/Features/reducers/userAuthSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";


const schema = yup.object().shape({
  name: yup
    .string()
    .required("please enter your name")
    .min(3, "name must be atleast 3 characters")
    .matches(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]*$/, "enter a valid name"),
  userName: yup
    .string()
    .required("please enter user name ")
    .min(3, "user name must be atleast 3 characters"),
  email: yup
    .string()
    .required("please enter email ")
    .email("plase enter valid email"),
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
    padding: 10,
  },
  formBox: {
    width: "50%",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  formBox2: {
    padding: theme.spacing(10),
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(5),
    },
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
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

 

const RegisterForm: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [registerError, setRegisterError] = useState("");
  const [registerUser, { isLoading }] = useUserRegisterMutation();
  const dispatch = useDispatch();
  const submitHandler = async (
    values: UserRegisterInterface,
    actions: FormikHelpers<UserRegisterInterface>
  ) => {
    if (!isLoading) {
      try {
        const res = await registerUser(values).unwrap();
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
        setRegisterError(error?.data?.message);
        console.log(registerError, "error");
      }
    }
  };

  const initialValues: UserRegisterInterface = {
    name: "",
    userName: "",
    email: "",
    password: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      onSubmit: submitHandler,
      validationSchema: schema,
    });

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
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
              src="assets/authpageimg1.svg"
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
                SignUp
              </Typography>
              <form onSubmit={handleSubmit}>
            <Stack direction={"column"} spacing={4} sx={{ my: 5 }}>
              <TextField
                sx={{ color: theme.palette.primary.light }}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name ? true : false}
                helperText={errors.name && touched.name ? errors.name : ""}
                name="name"
                label="name"
                size="medium"
                variant="filled"
                fullWidth
                required
              />

              <TextField
                sx={{ color: theme.palette.primary.light }}
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.userName && touched.userName ? true : false}
                helperText={
                  errors.userName && touched.userName ? errors.userName : ""
                }
                name="userName"
                label="userName"
                size="medium"
                variant="filled"
                fullWidth
                required
              />

              <TextField
                sx={{ color: theme.palette.primary.light }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email ? true : false}
                helperText={errors.email && touched.email ? errors.email : ""}
                name="email"
                label="email"
                type="email"
                size="medium"
                variant="filled"
                fullWidth
                required
              />

              <TextField
                sx={{ color: theme.palette.primary.light }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password ? true : false}
                helperText={
                  errors.password && touched.password ? errors.password : ""
                }
                name="password"
                label="password"
                type={showPassword ? "text" : "password"}
                size="medium"
                variant="filled"
                fullWidth
                required
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
                sign up
              </Button>

              <Typography variant="body1" color={theme.palette.primary.light}>
                Already have an account?
                <Link to="/login" style={{ textDecoration: "none" }}
                className={classes.signUpLink}>
                  Login
                </Link>
              </Typography>
              <Typography variant="body1" color={"error"}>
                {" "}
                {registerError}{" "}
              </Typography>
            </Stack>
          </form>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RegisterForm;
