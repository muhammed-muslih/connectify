import { PostRepoImp } from "@frameworks/database/mongoDb/repositories/postRepoImpl"
import { NewPostInterface } from "@interfaces/postInterface"
import { CommentInterface } from "@interfaces/postInterface"

export const postRepoInterface = (repository : ReturnType <PostRepoImp>) =>{

    const createPost = async (userId:string,newPost :NewPostInterface) => await repository.createPost(userId,newPost)

    const getAllPosts = async () => await repository.getAllPosts()

    const getUserPosts = async (userId : string) => await repository.getuserPosts(userId)

    const getSinglePost = async (postId:string) => await repository.getSinglePost(postId)

    const likeOrDislike = async (userId : string,postId : string) => await repository.likeOrDislike(userId,postId)

    const createRootComment = async (comment:CommentInterface,postId:string) => await repository.createRootComment(comment,postId)

    const replayComment = async(replay:CommentInterface,postId:string,commentId : string) => 
    await repository.replayComment(replay,postId,commentId)

    return {
        createPost,
        getAllPosts,
        getUserPosts,
        getSinglePost,
        likeOrDislike,
        createRootComment,
        replayComment 
    }

}

export type PostRepoInterface = typeof postRepoInterface