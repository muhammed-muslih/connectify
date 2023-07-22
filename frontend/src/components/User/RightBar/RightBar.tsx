import { Container ,Typography,Theme} from "@mui/material"
import { makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme : Theme) =>({
    container : {
        height: '100vh',
        paddingTop :theme.spacing(20),
        [theme.breakpoints.down('md')]:{
           display:'none'
        },
        position:'sticky',
        top:0,
        [theme.breakpoints.up('lg')]:{
           BorderColor:theme.palette.primary.dark,
           border:'2px groove ',
       },
    }
}))

const RightBar = () =>{
    const classess = useStyles()
    return (
      <Container className={classess.container}>
        <Typography variant="h5">
            this is right bar

        </Typography>
      </Container>
    )
}

export default RightBar