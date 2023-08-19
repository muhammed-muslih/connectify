import { Avatar,Typography,Stack} from "@mui/material"
import { useTheme } from "@mui/material"


const Contents = ({message,userName,profilePic}:{message:string,userName:string,profilePic:string}) => {
    const theme = useTheme()
    return(
        <Stack direction={'row'} spacing={2} sx={{alignItems:'center'}}>
            <Avatar sx={{width:60,height:60}} src={profilePic&&profilePic}>
            </Avatar>
            <Typography variant='h6' sx={{fontWeight:'bolder',color:theme.palette.primary.dark}}>{userName}</Typography>
            <Typography  sx={{fontWeight:'bolder',color:theme.palette.primary.main}}>{message}</Typography>
         </Stack>
    )
}

export default  Contents