import { Container ,Theme} from "@mui/material"
import { makeStyles} from '@mui/styles';
import Posts from "./Posts";
import { useGetAllPostsQuery } from "../../../redux/Features/api/postApiSlice";
import { useGetSavedPostsQuery } from "../../../redux/Features/api/userApiSlice"; 
import Shimmer from "./Shimmer";

const useStyles = makeStyles((theme:Theme)=>({
    container :{
        paddingTop:theme.spacing(10)
    }

}))

const Feed = () =>{
    const classes = useStyles() 
    const {data,isLoading,isFetching} = useGetAllPostsQuery()
    const {data:savedPosts,isLoading:savedPostLoading} = useGetSavedPostsQuery()
    
    return (
       <Container className={classes.container}>
       {

        isLoading&&isFetching&&savedPostLoading ?
        <Shimmer/>
        :
        data?.posts.map((post) => (
            <Posts _id={post._id} userName={post.userId?.userName}
             imageUrl={post.imageUrl} imageName={post.imageName}
             description = {post.description}  profilePicture= {post.userId?.profilePicture} key={post._id} 
             likes={post.likes} date={post.date} comments={post.comments} saved ={savedPosts?.saved}
             />
        ))
       }
       </Container>
    )
}

export default Feed
