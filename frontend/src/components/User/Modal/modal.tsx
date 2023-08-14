import { Box, Divider, Stack, Typography, Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const Modal = ({
  isCurrentUserPost,
  setReportModalOpen,
  setModalopen,
  handleOpenDeleteModal,
  handleOpenEditModal,
}: {
  isCurrentUserPost: boolean;
  setReportModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalopen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenDeleteModal: () => void;
  handleOpenEditModal: () => void;
}) => {
  const handleReport = () => {
    setReportModalOpen(true);
    setModalopen(false);
  };
  const handleDeleteModal = () => {
    setModalopen(false);
    handleOpenDeleteModal();
  };
  const handleEditModal = () => {
    setModalopen(false);
    handleOpenEditModal();
  };
  return (
    <Box
      boxShadow={6}
      sx={{ backgroundColor: "white", borderRadius: 2, p: 2 }}
      onClick={(e) => e.stopPropagation()}
    >
      {isCurrentUserPost ? (
        <Box sx={{ py: 1 }}>
          <Button
            variant="text"
            startIcon={<ModeEditOutlineIcon />}
            color="info"
            sx={{ textTransform: "lowercase" }}
            onClick={handleEditModal}
          >
            Edit Post
          </Button>
          <Divider />
          <Button
            variant="text"
            startIcon={<DeleteIcon />}
            color="error"
            sx={{ textTransform: "lowercase" }}
            onClick={handleDeleteModal}
          >
            Delete Post
          </Button>
        </Box>
      ) : (
        <Stack
          direction={"row"}
          spacing={1}
          color={"orange"}
          onClick={handleReport}
        >
          <WarningIcon color="warning" />
          <Typography sx={{ cursor: "pointer" }}>report post</Typography>
        </Stack>
      )}
    </Box>
  );
};

export default Modal;
