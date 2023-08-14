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

const RegisterForm = () => {
  const theme = useTheme();
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
    <Stack
      sx={{
        alignItems: "center",
        my: {
          xs: 0,
          sm: 1,
          md: 3,
          lg: 6,
          xl: 8,
        },
      }}
    >
      <Stack
        display={"flex"}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          boxShadow: {
            xs: 0,
            sm: "5",
          },
          borderRadius: "16px",
          width: {
            xs: "100%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "40%",
          },
        }}
        direction={"column"}
      >
        <Box borderBottom={2} borderColor={theme.palette.primary.main} my={2}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.light,
              mx: 6,
              paddingBottom: 2,
            }}
          >
            <IconButton size="large">
              <Diversity2Icon
                sx={{
                  fontSize: 60,
                  fontWeight: "bolder",
                  color: theme.palette.primary.main,
                }}
              />
            </IconButton>
            Connectify
          </Typography>
        </Box>

        <Box
          flexDirection="column"
          alignItems="center"
          p={6}
          sx={{
            px: {
              lg: 14,
              md: 10,
              sm: 6,
              xs: 2,
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction={"column"} spacing={4} sx={{ my: 5 }}>
              <TextField
                sx={{ color: theme.palette.primary.light }}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                inputRef={inputRef}
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
                  backgroundColor: theme.palette.primary.light,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                disableRipple
                disableElevation
              >
                sign up
              </Button>

              <Typography variant="body1" color={theme.palette.primary.light}>
                Already have an account?
                <Link to="/login" style={{ textDecoration: "none" }}>
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
      </Stack>
    </Stack>
  );
};

export default RegisterForm;
