import { Stack, Button, Box, Typography, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { toast, Toaster } from "react-hot-toast";
import { useRemovePostMutation } from "../../../redux/Features/api/adminApiSlice";


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

export default function DeletPost({
  open,
  handleClose,
  postId,
  userId
}: {
  open: boolean;
  handleClose: () => void;
  postId: string | undefined;
  userId: string | undefined
}) {
  const theme = useTheme();
  const [removePost,{isLoading}] = useRemovePostMutation()
 
const handleRemovePost = async() => {
    if(postId&&userId){
        try {
         const res = await removePost({postId,userId}).unwrap()
         if(res.status === 'success') {
            toast.success(res.message)
            handleClose()
         }
            
        } catch (error) {
            console.log(error);
            toast.error('something went wrong')  
        }

    }
}

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
             onClick={handleRemovePost}
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
