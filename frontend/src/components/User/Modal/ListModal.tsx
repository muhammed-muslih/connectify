import { Stack, Button, Box, Typography, Modal,Avatar, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ListInterface } from "../../../types/UserInterfaces";


const style = {
  top: "50%",
  left: "50%",
  position: "fixed",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 200,
    md: 200,
  },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight:'18%'
};

export default function ListModal({
  open,
  handleClose,
  title,
  list
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
  list?:ListInterface[]
}) {
  const theme = useTheme();
 
  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} overflow={'scroll'}>
         <Box sx={{pb:2,pl:4}}>
            <Typography variant="h6" fontWeight={'bold'}>{title}</Typography>
        </Box>
        <Divider/>   
        <Box >
          {
            list?.map((user)=>(
              <Stack direction={'row'} spacing={2} alignItems={'center'} p={1} key={user._id}>
              
              {
                user.profilePicture?
                <Avatar src={user.profilePicture}/>
                :
                <Avatar>
                  {user.userName?.split('')[0]}
                </Avatar>
              }
              <Typography>{user.userName}</Typography>
             </Stack>
            ))
          }
        </Box>
        </Stack>
      </Modal>
  );
}