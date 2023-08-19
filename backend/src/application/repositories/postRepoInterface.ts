import { PostRepoImp } from "@frameworks/database/mongoDb/repositories/postRepoImpl"
import { NewPostInterface } from "@interfaces/postInterface"
import { CommentInterface,ReportPostInterface } from "@interfaces/postInterface"

export const postRepoInterface = (repository : ReturnType <PostRepoImp>) =>{

    const createPost = async (userId:string,newPost :NewPostInterface) => await repository.createPost(userId,newPost)

    const getAllPosts = async (skip:number,limit:number) => await repository.getAllPosts(skip,limit)

    const getUserPosts = async (userId : string) => await repository.getuserPosts(userId)

    const getSinglePost = async (postId:string) => await repository.getSinglePost(postId)

    const likeOrDislike = async (userId : string,postId : string) => await repository.likeOrDislike(userId,postId)

    const createRootComment = async (comment:CommentInterface,postId:string) => await repository.createRootComment(comment,postId)

    const deleteRootComment = async(postId:string,commentId:string) => await repository.deleteRootComment(postId,commentId)

    const replayComment = async(replay:CommentInterface,postId:string,commentId : string) => 
    await repository.replayComment(replay,postId,commentId)
    
    const reportPost = async(postId:string,report:ReportPostInterface) => await repository.reportPost(postId,report)

    const editPost = async(postId:string,description:string) => await repository.editPost(postId,description)

    const deletePost = async (postId:string) => await repository.deletePost(postId)
    
    const getSinglePostDetails = async (postId:string) => await repository.getSinglePostDetails(postId)

    const getPosts = async () => await repository.getPosts()

    return {
        createPost,
        getAllPosts,
        getUserPosts,
        getSinglePost,
        likeOrDislike,
        createRootComment,
        replayComment ,
        reportPost,
        editPost,
        deletePost,
        getSinglePostDetails,
        deleteRootComment,
        getPosts
    }

}

export type PostRepoInterface = typeof postRepoInterface