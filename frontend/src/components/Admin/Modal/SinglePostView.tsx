import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Stack,Avatar} from '@mui/material';
import { useTheme } from "@mui/material/styles";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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
            position: 'absolute',
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

const SinglePostView = ({open,setOpen,singlePostsData}:
{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>,singlePostsData: {
    userName: string;
    userProfilePicture: string;
    imageUrl: string;
} | undefined}) => {
  
  const theme = useTheme()

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Avatar sx={{width:50,height:50}} src={singlePostsData?.userProfilePicture&&singlePostsData.userProfilePicture}/>
            <Typography sx={{fontWeight:"bolder",color:theme.palette.primary.main}}>{singlePostsData?.userName}</Typography>
          </Stack>
        </BootstrapDialogTitle>
    <DialogContent dividers sx={{overflowY:'hidden'}}>
          <Typography gutterBottom sx={{overflow:'hidden',}}>
            <img src={singlePostsData?.imageUrl}/>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default SinglePostView