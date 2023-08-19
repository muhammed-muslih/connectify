import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LockResetIcon from '@mui/icons-material/LockReset';
import * as yup from "yup";
import {
  useVerifyUserPasswordMutation,
  useChangePasswordMutation,
} from "../../../redux/Features/api/userApiSlice";
import { useFormik, FormikHelpers } from "formik";
import { toast, Toaster } from "react-hot-toast";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("enter new password")
    .min(5, "password must be at least 5 characters")
    .max(15, "password must be less than 15 characters"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your password"),
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ChangePasswordModal = ({setOpenSettingsModal}:{setOpenSettingsModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const [verifyError, setVerifyError] = useState("");
  useEffect(() => {
    newPasswordRef.current?.focus();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const colorTheme = useTheme();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  useEffect(() => {
    setDisabled(true);
  }, []);

  const [verifyPassword, { isLoading }] = useVerifyUserPasswordMutation();
  const [changePassword, { isLoading: isPasswordChangeLoading }] =
    useChangePasswordMutation();
  const setCurrentPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDisabled(true);
    setCurrentPassword(e.target.value);
  };

  const handleCurrentPassword = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (currentPassword.trim().length >= 5) {
        try {
          const res = await verifyPassword({
            password: currentPassword,
          }).unwrap();
          if (res.status === "success") {
            setVerifyError("");
            setDisabled(false);
          }
        } catch (error: any) {
          console.log(error);
          setVerifyError(error.data?.message);
        }
      } else {
        setVerifyError("password must be at least 5 characters");
      }
    }
  };

  const changePasswordHandler = async (
    values: { newPassword: string; confirmPassword: string | null },
    actions: FormikHelpers<{ newPassword: string; confirmPassword: string }>
  ) => {
    if (!isPasswordChangeLoading) {
      try {
        const res = await changePassword({
          password: values.newPassword,
        }).unwrap();
        if (res.status === "success") {
          setOpenSettingsModal(false)
          toast.success(res.message);
          actions.resetForm();
          setDisabled(true);
          setVerifyError("");
          handleClose();
        }
      } catch (error: any) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
  };

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      onSubmit: changePasswordHandler,
      validationSchema: schema,
    });

  return (
    <div>
      <Toaster position={"top-right"} />
      <Button
        variant="text"
        startIcon={<LockResetIcon sx={{width:30,height:30}}/>}
        sx={{ cursor: "pointer" ,textTransform:"lowercase",fontWeight:'bolder',fontSize:18}}
        onClick={handleClickOpen}
      >
        security
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ChangeCircleIcon
              sx={{
                width: 30,
                height: 30,
                mr: 1,
                color: colorTheme.palette.primary.main,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: colorTheme.palette.primary.main,
                fontWeight: "bolder",
              }}
            >
              Change Password
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ width: "28rem", px: 2 }}>
            <Typography sx={{ color: colorTheme.palette.primary.main }}>
              currentPassword
            </Typography>
            <TextField
              sx={{ color: colorTheme.palette.primary.light }}
              name="password"
              type={showPassword ? "text" : "password"}
              size="medium"
              variant="filled"
              fullWidth
              error={verifyError ? true : false}
              helperText={verifyError}
              onChange={setCurrentPasswordHandler}
              onKeyDown={handleCurrentPassword}
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
            <form onSubmit={handleSubmit}>
              <Typography
                sx={{ color: colorTheme.palette.primary.main, mt: 1 }}
              >
                newPassword
              </Typography>
              <TextField
                inputRef={newPasswordRef}
                sx={{ color: colorTheme.palette.primary.light }}
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                size="medium"
                variant="filled"
                fullWidth
                disabled={isDisabled}
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.newPassword && touched.newPassword ? true : false}
                helperText={
                  errors.newPassword && touched.newPassword
                    ? errors.newPassword
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                      >
                        {showNewPassword
                          ? !isDisabled && <VisibilityOff />
                          : !isDisabled && <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography
                sx={{ color: colorTheme.palette.primary.main, mt: 1 }}
              >
                confirmPassword
              </Typography>
              <TextField
                sx={{ color: colorTheme.palette.primary.light }}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                size="medium"
                variant="filled"
                fullWidth
                disabled={isDisabled}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.confirmPassword && touched.confirmPassword
                    ? true
                    : false
                }
                helperText={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                      >
                        {showConfirmPassword
                          ? !isDisabled && <VisibilityOff />
                          : !isDisabled && <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <DialogActions>
                <Button autoFocus type="submit">
                  Save changes
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
export default ChangePasswordModal;
