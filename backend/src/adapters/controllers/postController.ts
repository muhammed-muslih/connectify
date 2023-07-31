import { Request,Response } from "express"
import asyncHandler from 'express-async-handler'
import { S3ServiceImpl } from "@frameworks/services/s3BucketServie"
import { S3ServiceInterface } from "@application/services/s3ServiceInterface"
import { addPostAndGetUrl,getAllPosts,userPosts,postLikeOrDislike,createComment,setReplayComment} from "@application/useCases/post/userPost"
import { CustomRequest } from "@interfaces/customRequestInterface"
import { PostRepoImp } from "@frameworks/database/mongoDb/repositories/postRepoImpl"
import { PostRepoInterface } from "@application/repositories/postRepoInterface"

export const postController = (
    s3ServiceImpl :S3ServiceImpl,
    s3ServiceInterface :S3ServiceInterface,
    postRepoImpl : PostRepoImp,
    postRepoInterface : PostRepoInterface

) =>{

    const s3Service = s3ServiceInterface(s3ServiceImpl())
    const postRepo = postRepoInterface(postRepoImpl())
    
    const uploadPostAndGetUrl = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const userId = req.userId as string
        const file = req.file as Express.Multer.File
        const {description} = req.body
        const result = await addPostAndGetUrl(userId,description,file,postRepo,s3Service)
        res.json({
            status:'success',
            post:result,
            message:'post added successfully'
        })

    })

    const findAllPosts = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const posts = await getAllPosts(postRepo)
        res.json({
            status:'success',
            posts
        })
       
    })

    const getUserPost = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const {userId} = req.params
        const posts = await userPosts(userId,postRepo)
        res.json({
            status:'success',
            posts
        })
    })


    const postLikeAndDislike = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const {postId} = req.body
        const userId = req.userId as string
        console.log("postId",postId);
        console.log(userId);
        
        
        const result = await postLikeOrDislike(userId,postId,postRepo)
        res.json({
            status:'success',
            ...result,
        })
    })

    const createRootComment = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const userId = req.userId as string
        const {postId} = req.params
        const {text} = req.body
        console.log(text,'text');
        
        await createComment(userId,postId,text,postRepo)
        res.json({
            status:'success',
            message:'comment addedd successfully'
        })
    })

    const replayComment = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const userId = req.userId as string
        const {postId,commentId} = req.params   
        const {text} = req.body
        await setReplayComment(userId,postId,commentId,text,postRepo)
        res.json({
            status:'success',
            message:'replay comment addedd successfully '
        })
    })

    return {
        uploadPostAndGetUrl,
        findAllPosts,
        getUserPost,
        postLikeAndDislike,
        createRootComment,
        replayComment
    }
}