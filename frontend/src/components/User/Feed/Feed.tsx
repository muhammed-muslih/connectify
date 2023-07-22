import { Container ,Theme} from "@mui/material"
import { makeStyles} from '@mui/styles';
import Posts from "./Posts";


const useStyles = makeStyles((theme:Theme)=>({
    container :{
        paddingTop:theme.spacing(12)
    }

}))

const Feed = () =>{
    const classes = useStyles() 
    return (
       <Container className={classes.container}>
       <Posts/>
       <Posts/>
       </Container>
    )
}

export default Feed