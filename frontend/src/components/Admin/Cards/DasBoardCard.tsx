import { Box ,Typography} from "@mui/material"
import { useTheme } from "@mui/material/styles";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const DasBoardCard = ({title,count}:{title:string,count: number}) => {
    const theme = useTheme()
    return (
        <Box sx={{position:'relative',p:2}}>
            <Box sx={{p:5,backgroundColor:'white',boxShadow:6,borderRadius:4}}>
                <Box sx={{p:2,backgroundColor:theme.palette.primary.main,position:'absolute',top:0,left:6,borderRadius:4,boxShadow:6}}>
                <DynamicFeedIcon sx={{width:50,height:50,color:'white'}}/>
                </Box>
                <Box sx={{display: 'flex',justifyContent: 'center',}}>
                <Typography  variant="h6" sx={{color:theme.palette.primary.dark,fontWeight:"bolder"}}>{title} : {count}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default DasBoardCard