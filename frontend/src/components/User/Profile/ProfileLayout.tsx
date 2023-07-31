import { Container ,Theme} from "@mui/material"
import { makeStyles} from '@mui/styles';
import ProfileSection from "./ProfileSection";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserPostsQuery } from "../../../redux/Features/api/postApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";

const useStyles = makeStyles((theme:Theme)=>({
    container :{
        paddingTop:theme.spacing(12)
    }
}))


const Profile = () => {

    const [isUserPost,setUserPost] = useState<boolean>(true)
    const [isCurrentUser,setCurrentUser] = useState<boolean>(false)

    const {id} = useParams()
    const currentUser = useSelector(selectUserId)
    useEffect(()=>{
      if(id&& id===currentUser){
        setCurrentUser(true)
      }
    },[])
     
  
    const {data:posts,isLoading,isFetching} = useGetUserPostsQuery({id})
    const classes = useStyles() 
  
    return (
       <Container className={classes.container}>
        <ProfileSection isUserPost={isUserPost} setUserPost={setUserPost} userId={id} isCurrentUser={isCurrentUser} setCurrentUser={setCurrentUser}/>
        {
            isUserPost ? <Posts  posts={posts?.posts} />:isCurrentUser&&<Posts  posts={posts?.posts}/>
        }
      </Container>
    )
}

export default Profile