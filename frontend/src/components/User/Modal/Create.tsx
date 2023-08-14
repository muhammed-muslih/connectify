import {
  Box,
  Typography,
  Modal,
  Button,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useCreatePostMutation } from "../../../redux/Features/api/postApiSlice";
import toast, { Toaster } from "react-hot-toast";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 400,
    md: 600,
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
};

const CreateModal = (props: {
  openModal: boolean;
  handleModalClose: () => void;
}) => {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>();
  const [description, setDescription] = useState<string | null>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>();
  const [cretatePost, { isLoading, isSuccess }] = useCreatePostMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      previewImage(file);
    }
  };

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!file) {
      setUploadError("please add your post ");
    } else {
      setUploadError("");
      const postData = new FormData();
      postData.append("image", file);
      if (description) {
        postData.append("description", description);
      }
      if (!isLoading) {
        try {
          const res = await cretatePost({ postData }).unwrap();
          if (res.status === "success") {
            props.handleModalClose();
            toast.success("posted successfully");
          }
        } catch (error: any) {
          console.log(error);
          if (error.status === 500) {
            toast.error("something went wrong");
          } else if (error.status === 401) {
            console.log(error.data.message);
          } else {
            setUploadError(error.data?.message);
          }
        }
      }
    }
  };

  const handleClose = () => {
    props.handleModalClose();
    setFile(null);
    setUploadError("");
    setImagePreview("");
  };

  return (
    <Box>
      <div>
        <Toaster containerStyle={{ zIndex: 100 }} />
      </div>
      <Modal
        open={props.openModal}
        onClose={props.handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={"space-between"}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}
            >
              Create Your Post
            </Typography>
            <CloseOutlinedIcon
              sx={{
                fontSize: 32,
                color: theme.palette.primary.main,
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
          </Box>
          <form action="">
            <Stack direction={"column"} spacing={4} sx={{ my: 5 }}>
              <label htmlFor="contained-button-file">
                <input
                  accept="images/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PostAddIcon />}
                >
                  select your post
                </Button>
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "50%", maxHeight: "350px" }}
                />
              )}
              <TextField
                sx={{ color: theme.palette.primary.light }}
                multiline
                rows={2}
                name="description"
                label="write your amazing description here"
                size="medium"
                variant="filled"
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
              />

              {isLoading ? (
                <Button
                  variant="contained"
                  size="large"
                  endIcon={
                    <CircularProgress size={25} sx={{ color: "white" }} />
                  }
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  disableRipple
                  disableElevation
                >
                  {" "}
                  Post Adding{" "}
                </Button>
              ) : (
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
                  onClick={(e) => handleUpload(e)}
                >
                  Add Post
                </Button>
              )}
            </Stack>
          </form>
          <Typography sx={{ color: "red" }}>{uploadError}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateModal;
