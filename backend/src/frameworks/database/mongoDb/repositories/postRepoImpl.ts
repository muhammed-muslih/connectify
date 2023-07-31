import Posts from "../models/postModel";
import {NewPostInterface} from "@interfaces/postInterface";
import AppError from "@utils/appError";
import { HttpStatus } from "@interfaces/httpStatus";
import mongoose from "mongoose";
import { CommentInterface } from "@interfaces/postInterface";

export const postRepoImpl  = () =>{
  
    const createPost = async(userId:string,newPost:NewPostInterface) =>{
        return await Posts.create({userId,...newPost})
    }

    const getAllPosts = async() => {
       const posts = await Posts.find({delete:false}).sort({date:-1})
                     .populate('userId')
                     .populate('comments.postedBy') 
                     .populate('comments.replies.postedBy');
       return posts
    }

    const getuserPosts = async(userId:string) => await Posts.find({delete:false,userId}).sort({date:-1})

    const getSinglePost = async(postId:string) => await Posts.findById({_id:postId})
    
    const likeOrDislike = async (userId : string,postId : string) => {
        try {
            const post = await getSinglePost(postId)
            if(!post){
                throw new AppError('post not found',HttpStatus.BAD_REQUEST)
            }
            const validUserId = new  mongoose.Types.ObjectId(userId)
            const isLiked = post.likes.includes(validUserId)
            let message;
            if(!isLiked){
                post.likes.push(validUserId)
                message = 'Post liked successfully';
            }else{
                post.likes = post.likes.filter(userId => userId.toString() !== validUserId.toString());
                message = 'Post disliked successfully';
            }
            await post.save(); 
            return {
                post,
                message
            }
        
        } catch (error) {
            console.log(error); 
        }
        
    }

    const createRootComment = async(comment:CommentInterface,postId:string) => {
        const result = await Posts.findByIdAndUpdate(
            {_id:postId},
            { $push : {comments : comment} },
            { new:true}
        )
        return result
    }

    const replayComment = async(replay:CommentInterface,postId:string,commentId : string) => {
        const result = await Posts.updateOne(
            {_id:postId,'comments._id':commentId},
            {$push:{'comments.$.replies':replay}},
            { new:true}
        )
        return result 
    }

   

    return {
        createPost,
        getAllPosts,
        getuserPosts,
        getSinglePost,
        likeOrDislike,
        createRootComment,
        replayComment
    }
}

export  type PostRepoImp = typeof postRepoImpl