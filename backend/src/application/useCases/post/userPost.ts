import { PostRepoInterface } from "@application/repositories/postRepoInterface"
import { S3ServiceInterface } from "@application/services/s3ServiceInterface"
import { NewPostInterface } from "@interfaces/postInterface"
import AppError from "@utils/appError"
import { HttpStatus } from "@interfaces/httpStatus"
import mongoose from "mongoose"
import { CommentInterface } from "@interfaces/postInterface"



export const addPostAndGetUrl = async(
    userId: string,
    description: string,
    file : Express.Multer.File,
    postRepository :ReturnType<PostRepoInterface>,
    s3Service : ReturnType<S3ServiceInterface>
)=>{
    const result = await s3Service.uploadAndGetUrl(file)
    const post : NewPostInterface = {description,imageName:result?.imageName,imageUrl:result?.url}
    const addPost = await postRepository.createPost(userId,post)
    if (!addPost) {
        throw new AppError("post not created", HttpStatus.BAD_REQUEST);
      }
    return addPost
}

export const getAllPosts = (
    postRepository:ReturnType<PostRepoInterface>,
) =>{
    const allPosts = postRepository.getAllPosts()
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