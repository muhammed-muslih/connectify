import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import  DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { useSelector } from "react-redux";
import { useTheme ,Tooltip,IconButton} from "@mui/material";
import { useDeleteCommentMutation } from "../../../redux/Features/api/postApiSlice";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Features/reducers/userAuthSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationModal = ({
  commentId,
  commentedUser,
  postId,
  setIsDelete,
  setDeleteCmntId
}: {
  commentId: string;
  commentedUser: string | undefined;
  postId: string | undefined;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteCmntId: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isCurrentUser, setCurrentUser] = useState(false);
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  
  const currentUser = useSelector(selectUserId);
  useEffect(() => {
    console.log(commentId);
    if (currentUser) {
      setCurrentUser(currentUser === commentedUser);
    }
  }, [commentedUser]);

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const deleteHandler = async () => {
    if (postId && commentId && !isLoading) {
      try {
        const res = await deleteComment({ postId, commentId }).unwrap();
        console.log(res);
        if (res.status === "success") {
          setDeleteCmntId(commentId);
          setIsDelete(true)
          handleClose();
          // toast.success(res.message);
        }
      } catch (error:any) {
        if (error.status === 403 && error .data?.message === "Blocked user"
          ) {
            dispatch(logoutUser());
          }else{
            console.log(error);
            toast.error("something went wrong");
          }
      }
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <Tooltip title="Delete"  sx={{color:theme.palette.primary.light}}>
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon   sx={{color:theme.palette.primary.light}}/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {isCurrentUser ? (
          <>
            <DialogTitle
              sx={{ color: theme.palette.primary.main, fontWeight: "bolder" }}
            >
              Are you sure?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Do you want to Delete this comment!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={deleteHandler}>Yes</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle color={"error"} sx={{ fontWeight: "bolder" }}>
              Permission Denied!
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                You don't have permission to delete this comment
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ok</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
