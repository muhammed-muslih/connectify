import {
  Stack,
  Button,
  Box,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useEditPostMutation } from "../../../redux/Features/api/postApiSlice";
import { toast, Toaster } from "react-hot-toast";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 400,
    md: 500,
  },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function EditModal({
  open,
  handleClose,
  description,
  postId,
}: {
  open: boolean;
  handleClose: () => void;
  description: string | undefined;
  postId: string | undefined;
}) {
  const theme = useTheme();
  const [descriptionText, setPostDescription] = useState<string | undefined>(
    description
  );
  const [editPost, { isLoading }] = useEditPostMutation();

  const handlePostEdit = async () => {
    if (!isLoading) {
      try {
        const res = await editPost({
          postId,
          description: descriptionText,
        }).unwrap();
        if (res.status === "success") {
          toast.success(res.message);
          handleClose();
        }
      } catch (error: any) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
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
              Edit Post
            </Typography>
          </Stack>
          <Stack sx={{ mt: 2 }}>
            <TextField
              id="filled-multiline-static"
              variant="filled"
              fullWidth
              value={descriptionText}
              onChange={(e) => setPostDescription(e.target.value)}
            />
          </Stack>
          <Stack sx={{ mt: 4, ml: 36 }} spacing={1} direction={"row"}>
            <Button
              variant="outlined"
              color="info"
              startIcon={<CancelIcon />}
              onClick={handleClose}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              color="info"
              startIcon={<ModeEditOutlineIcon />}
              onClick={handlePostEdit}
            >
              edit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
