import {
    Box,
    Typography,
    Modal,
    Button,
  } from "@mui/material";
  import { useTheme } from "@mui/material/styles";
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  
  
  
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
  
  const SuccessModal = (props:{
    open: boolean;
    handleModalClose: () => void;
  }) => {
    const theme = useTheme();

    const handleClose = () => {
      props.handleModalClose();
    };
  
    return (
      <Box>
        <Modal
          open={props.open}
          onClose={props.handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:'center'}}>
            <CheckCircleIcon  sx={{color:'green',fontSize:150}} />
            <Typography
              id="modal-modal-title"
              variant="h6"
              sx={{ color: theme.palette.primary.main,p:2,fontWeight:"bolder" }}
              component="h2"
            >
              Payment completed successfully
            </Typography>
            </Box>
            <Box sx={{display:"flex",flexDirection:'column'}}>
            <Button
              variant="contained"
              color="success"
              onClick={handleClose}
            >
              ok
            </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default SuccessModal;