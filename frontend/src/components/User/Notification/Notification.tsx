import { Container } from "@mui/material"
import Header from "./Header"
import Contents from "./Contents"


const classes = {
    container:{
        paddingTop:5,
    }
}


const Notification = () => {
    return(
        <>
        <Header />
        <Container sx={classes.container}>
            <Contents message={'liked your post'} profilePic="" userName="userName"/>
        </Container>
        </>
    )
}

export default Notification