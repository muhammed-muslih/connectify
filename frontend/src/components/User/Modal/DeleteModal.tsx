import { Stack, Button, Box, Typography, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { useDeletePostMutation} from "../../../redux/Features/api/postApiSlice";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";


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

export default function DeletModal({
  open,
  handleClose,
  postId,
  setDelete,
  setDeletedId
}: {
  open: boolean;
  handleClose: () => void;
  postId: string | undefined;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>,
  setDeletedId: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
  const theme = useTheme();
  const [deletePost, { isLoading }] = useDeletePostMutation();
 const navigate = useNavigate()
  const handlePostDelete = async () => {
    if (!isLoading) {
      try {
        const res = await deletePost({ postId }).unwrap();
        if (res.status === "success") {
          setDeletedId(postId)
          setDelete(true)
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
            <DeleteIcon sx={{ color: theme.palette.primary.main }} />
            <Typography
              id="modal-modal-title"
              variant="h6"
              sx={{ color: theme.palette.primary.main }}
              component="h2"
            >
              Are you sure ! Do you want to Delete this post ?
            </Typography>
          </Stack>
          <Stack sx={{ mt: 4, ml: 36 }} spacing={1} direction={"row"}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<CancelIcon />}
              onClick={handleClose}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handlePostDelete}
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
