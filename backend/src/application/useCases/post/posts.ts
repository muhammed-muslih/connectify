import { PostRepoInterface } from "@application/repositories/postRepoInterface"
import { S3ServiceInterface } from "@application/services/s3ServiceInterface"
import { NewPostInterface } from "@interfaces/postInterface"
import AppError from "@utils/appError"
import { HttpStatus } from "@interfaces/httpStatus"
import { CommentInterface } from "@interfaces/postInterface"

export const addPostAndGetUrl = async(
    userId: string,
    description: string,
    file : Express.Multer.File,
    postRepository :ReturnType<PostRepoInterface>,
    s3Service : ReturnType<S3ServiceInterface>
)=>{
    const postPic = true
    const result = await s3Service.uploadAndGetUrl(file,postPic)
    const post : NewPostInterface = {description,imageName:result?.imageName,imageUrl:result?.url}
    const addPost = await postRepository.createPost(userId,post)
    if (!addPost) {
        throw new AppError("post not created", HttpStatus.BAD_REQUEST);
      }
    return addPost
}

export const getAllPosts = (
    page:number,
    limit:number,
    postRepository:ReturnType<PostRepoInterface>,
) =>{
    let skip = (page - 1)*limit
    const allPosts = postRepository.getAllPosts(skip,limit)
    if(!allPosts){
        throw new AppError("posts are not available", HttpStatus.BAD_REQUEST)
    }
    return allPosts

}

export const userPosts = (
    userId:string,
    postRepository:ReturnType<PostRepoInterface>,
) => {
    const posts = postRepository.getUserPosts(userId)
    return posts
}


export const postLikeOrDislike= async(
    userId:string,
    postId:string,
    postRepository:ReturnType<PostRepoInterface>,
) => {
    const result = await postRepository.likeOrDislike(userId, postId)
    return result
}


export const createComment = async(
    userId : string,
    postId : string,
    text : string,
    postRepository:ReturnType<PostRepoInterface>,
) => {
    const comment:CommentInterface = {
        postedBy :userId,
        text : text
    }
    const result = await postRepository.createRootComment(comment, postId)
    return result
}

export const deleteComment = async(
    postId : string,
    commentId : string,
    postRepository:ReturnType<PostRepoInterface>,
) => {

    if(!postId || !commentId) {
        throw new AppError('credentials not found',HttpStatus.BAD_REQUEST)
    }
    return await postRepository.deleteRootComment(postId,commentId)
}

export const setReplayComment = async(
    userId : string,
    postId : string,
    commentId : string,
    text : string,
    postRepository:ReturnType<PostRepoInterface>
) => {
    const replay:CommentInterface = {
        postedBy :userId,
        text : text
    }
    const result = await postRepository.replayComment(replay,postId,commentId)
    return result 
}

export const reportPost = async(
    userId:string,
    postId : string,
    text:string,
    postRepository:ReturnType<PostRepoInterface>
) => {
    const post = await postRepository.getSinglePost(postId)
    if(!post){
        throw new AppError('post not found',HttpStatus.BAD_REQUEST)
    }
    if(post.userId.toString() === userId) {
        throw new AppError("you can't report this post",HttpStatus.UNAUTHORIZED)
    }
    const isReportedUser = post.report.find((post)=>post.reportedBy?.toString() === userId)
    if(isReportedUser){
        return{
            message:'you already reported this post'
        }
    }else{
        const report = {text,reportedBy:userId}
        await postRepository.reportPost(postId,report)
        return {
            message:'post reported'
        }
    }
}


export const editPost = async(
    userId:string,
    postId:string,
    description:string,
    postRepository:ReturnType<PostRepoInterface>    
) => {
    const post = await postRepository.getSinglePost(postId)
    if(!post){
        throw new AppError('post not found',HttpStatus.BAD_REQUEST)
    }
    if(post.userId.toString() !== userId){
       throw new AppError("you can't edit this post",HttpStatus.UNAUTHORIZED)
    }
   
    return await postRepository.editPost(postId,description)
}

export const deletePost = async(
    userId:string,
    postId:string,
    postRepository:ReturnType<PostRepoInterface> ,
    s3Service : ReturnType<S3ServiceInterface>
) => {
    const post = await postRepository.getSinglePost(postId)
    if(!post){
        throw new AppError('post not found',HttpStatus.BAD_REQUEST)
    }
    if(post.userId.toString() !== userId){
        throw new AppError("you can't delete this post",HttpStatus.UNAUTHORIZED)
    }
    const fileName = post.imageName
    if(fileName){
    await s3Service.removeFile(fileName)
    }
    return await postRepository.deletePost(postId)
}

export const getSinglePost = async(
    postId:string,
    postRepository:ReturnType<PostRepoInterface> ,
)=>{
    if(!postId){
        throw new AppError('postId not found',HttpStatus.BAD_REQUEST)
    }
    return await postRepository.getSinglePostDetails(postId)
}


export const getPosts = async(
    postRepository:ReturnType<PostRepoInterface> ,
) =>{
    return await postRepository.getPosts()
}

export const getPostStatistics  = async(
    postRepository:ReturnType<PostRepoInterface> ,
) =>{
    const post= await postRepository.getPostsStatistics()
    const transformedResult = {
        totalPosts: post[0].totalPosts[0]?.count || 0,
        postsToday: post[0].postsToday[0]?.count || 0,
        postsThisWeek: post[0].postsThisWeek[0]?.count || 0,
        postsThisMonth: post[0].postsThisMonth[0]?.count || 0
      };
      
    return transformedResult
}
