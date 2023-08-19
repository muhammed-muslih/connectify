import {
  Stack,
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  Avatar,
  CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import { UpdateUserInterface } from "../../../types/UserInterfaces";
import {
  useRemoveProfilePicMutation,
  useUpdateUserProfileMutation,
} from "../../../redux/Features/api/userApiSlice";
import { useDispatch } from "react-redux";
import {
  setProfilePicture,
  removeProfilePicture,
} from "../../../redux/Features/reducers/userAuthSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "70%",
    md: "40%",
  },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .required("please enter user name ")
    .min(3, "user name must be atleast 3 characters"),
  bio: yup.string().min(4, "Bio must be at least 4 characters long"),
  name: yup.string().min(3, "user name must be atleast 3 characters"),
});
// (value) => value && value.size <= 1000000 // 1MB

export default function EditProfileModal({
  open,
  handleClose,
  profileName,
  profilePicture,
  bio,
  name,
}: {
  open: boolean;
  handleClose: () => void;
  profileName: string | undefined;
  profilePicture: string | undefined;
  bio: string | undefined;
  name: string | undefined;
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profilePictureError, setProfilePictureError] = useState<string>("");
  const [profileUpdateError, setProfileUpdateError] = useState<string>("");
  const [updateUserData, { isLoading }] = useUpdateUserProfileMutation();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      const isValid = validateProfilePic(file);
      if (isValid) {
        previewImage(file);
      }
    }
  };

  const validateProfilePic = (file: File) => {
    const fileName = file.name;
    console.log(fileName, "fileName");
    const fileNameParts = fileName.split(".");
    console.log(fileNameParts, "parts");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    const acceptedFormats = ["jpeg", "png", "jpg", "avif"];
    const isValidFormate = acceptedFormats.includes(fileExtension);
    if (!isValidFormate) {
      return setProfilePictureError("unsupported file format");
    } else {
      setProfilePictureError("");
    }
    if (file.size >= 1000000) {
      return setProfilePictureError("image size is too large");
    } else {
      setProfilePictureError("");
    }
    return true;
  };

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (
    values: UpdateUserInterface,
    actions: FormikHelpers<UpdateUserInterface>
  ) => {
    setProfileUpdateError("");
    const updateData = new FormData();
    if (values.userName) {
      updateData.append("userName", values.userName);
    }
    updateData.append("bio", values.bio ?? "");
    if (values.name) {
      updateData.append("name", values.name);
    }
    if (file) {
      updateData.append("profilePic", file);
    }
    console.log(updateData, "data");

    if (!isLoading) {
      try {
        const res = await updateUserData({ updateData }).unwrap();
        if (res.status === "success") {
          toast.success("profile updated successfully");
          dispatch(
            setProfilePicture({
              profilePicture: res.profilePiture,
            })
          );
          handleClose();
        }
      } catch (error: any) {
        console.log(error);
        if (error.status === 500) {
          toast.error("something went wrong");
        } else if (error.status === 401) {
          console.log(error.data.message);
        } else {
          setProfileUpdateError(error.data?.message);
        }
      }
    }
  };

  const initialValues: UpdateUserInterface = {
    userName: profileName,
    bio: bio,
    name: name,
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: submitHandler,
    });
  console.log(profilePictureError);

  const handleConfirmModal = () => {
    setOpenConfirmation(true);
  };

 

  return (
    <div>
      <Toaster position="top-right" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <ModeEditOutlineIcon sx={{ color: theme.palette.primary.main }} />
            <Typography
              id="modal-modal-title"
              variant="h6"
              color="blue"
              component="h2"
              sx={{ color: theme.palette.primary.main }}
            >
              Edit Profile
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Stack sx={{ mt: 2 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                  md: "column",
                  lg: "row",
                }}
                alignItems={"center"}
                spacing={5}
              >
                {profilePicture ? (
                  <Stack alignItems={"center"}>
                    <Avatar
                      sx={{
                        width: { xs: 160, md: 200, lg: 250 },
                        height: { xs: 160, md: 200, lg: 250 },
                        fontWeight: "bolder",
                        fontSize: "60px",
                        bgcolor: theme.palette.primary.light,
                      }}
                      src={profilePicture}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.dark,
                        cursor: "pointer",
                      }}
                      onClick={handleConfirmModal}
                    >
                      remove profile pic!
                    </Typography>
                  </Stack>
                ) : imagePreview ? (
                  <Avatar
                    sx={{
                      width: { xs: 160, md: 200, lg: 250 },
                      height: { xs: 160, md: 200, lg: 250 },
                      fontWeight: "bolder",
                      fontSize: "60px",
                      bgcolor: theme.palette.primary.light,
                    }}
                    src={imagePreview}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: { xs: 160, md: 200, lg: 250 },
                      height: { xs: 160, md: 200, lg: 250 },
                      fontWeight: "bolder",
                      fontSize: "60px",
                      bgcolor: theme.palette.primary.light,
                    }}
                  >
                    {profileName?.split("")[0]}
                    {profileName?.split("")[profileName.length - 1]}
                  </Avatar>
                )}
                {openConfirmation ? (
                  <ConfirmationModal
                    openConfirmation={openConfirmation}
                    handleOpenConfirmation={handleOpenConfirmation}
                    handleCloseConfirmation={handleCloseConfirmation}
                  />
                ) : (
                  ""
                )}
                <Box width={"100%"}>
                  <label htmlFor="contained-button-file">
                    <input
                      id="contained-button-file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
                      name="profilePic"
                    />
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<PostAddIcon />}
                      sx={{ textTransform: "lowercase" }}
                    >
                      change profile
                    </Button>
                  </label>
                  <Typography variant="body2" color={"error"}>
                    {profilePictureError}
                  </Typography>
                  <Typography
                    variant="body2"
                    mt={2}
                    sx={{ color: theme.palette.primary.dark }}
                  >
                    change name
                  </Typography>

                  <TextField
                    variant="filled"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name ? true : false}
                    helperText={errors.name && touched.name ? errors.name : ""}
                    name="name"
                  />
                  <Typography
                    variant="body2"
                    mt={2}
                    sx={{ color: theme.palette.primary.dark }}
                  >
                    change user name
                  </Typography>
                  <TextField
                    variant="filled"
                    fullWidth
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.userName && touched.userName ? true : false}
                    helperText={
                      errors.userName && touched.userName ? errors.userName : ""
                    }
                    name="userName"
                  />
                  <Typography
                    variant="body2"
                    mt={2}
                    sx={{ color: theme.palette.primary.dark }}
                  >
                    change bio
                  </Typography>
                  <TextField
                    variant="filled"
                    multiline
                    rows={2}
                    fullWidth
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.bio && touched.bio ? true : false}
                    helperText={errors.bio && touched.bio ? errors.bio : ""}
                    name="bio"
                  />
                </Box>
              </Stack>
            </Stack>
            <Stack
              sx={{
                mt: 4,
                ml: {
                  lg: "60%",
                  md: "50%",
                  sm: "50%",
                  xl: "73%",
                  xs: "40%",
                },
              }}
              spacing={1}
              direction={"row"}
            >
              <Button
                variant="outlined"
                color="info"
                startIcon={<CancelIcon />}
                onClick={() => {
                  handleClose();
                  setProfilePictureError("");
                }}
              >
                cancel
              </Button>
              {isLoading ? (
                <Button
                  variant="contained"
                  color="info"
                  endIcon={
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  }
                  disableRipple
                  disableElevation
                >
                  editing
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<ModeEditOutlineIcon />}
                  type="submit"
                >
                  edit
                </Button>
              )}
            </Stack>
          </form>
          <Typography variant="body2" color={"error"}>
            {profileUpdateError}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

function ConfirmationModal({
  openConfirmation,
  handleOpenConfirmation,
  handleCloseConfirmation,
}: {
  openConfirmation: boolean;
  handleOpenConfirmation: () => void;
  handleCloseConfirmation: () => void;
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [removeProfilePic, { isLoading }] = useRemoveProfilePicMutation();
  const handleRemoveProfilePic = async () => {
    if (!isLoading) {
      try {
        const res = await removeProfilePic().unwrap();
        if (res.status === "success") {
          console.log(res);
          toast.success(res.message);
          dispatch(removeProfilePicture());
          handleCloseConfirmation();
        }
      } catch (error: any) {
        if (error.status === 500) {
          toast.error("something went wrong");
          console.log(error);
        } else if (error.status === 401) {
          console.log(error.data.message);
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <Button onClick={handleOpenConfirmation}>Open Child Modal</Button>
      <Modal
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 220 }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <DeleteIcon />
            <Typography variant="h6" sx={{ color: theme.palette.primary.dark }}>
              Are you sure!
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={1} mt={3} ml={5}>
            <Button variant="contained" onClick={handleCloseConfirmation}>
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleRemoveProfilePic}
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
