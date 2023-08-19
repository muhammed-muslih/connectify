import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import asyncHandler from "express-async-handler"
import { allUsers ,changeUserStatus } from "@application/useCases/user/user"
import { Request,Response } from "express"
import { PostRepoImp } from "@frameworks/database/mongoDb/repositories/postRepoImpl"
import { PostRepoInterface } from "@application/repositories/postRepoInterface"
import { getPosts } from "@application/useCases/post/posts"


export const adminController = (
    userRepoImpl : UserRepoImpl,
    userRepoInterface : UserRepoInterface,
    postRepoImpl:PostRepoImp,
    postRepoInterface:PostRepoInterface,
) =>{

    const userRepository = userRepoInterface(userRepoImpl())
    const postRepository = postRepoInterface(postRepoImpl())

    const getAllUsers = asyncHandler(async(req:Request,res:Response) => {
        const users = await allUsers(userRepository)
        res.json({
          status: 'success',
          users
        })
  
      })

    const blockAndUnBlockUser = asyncHandler(async(req:Request, res:Response) => {
      const {userId}  = req.body
      const result = await changeUserStatus (userId,userRepository)
      res.json({
        status: 'success',
        message: result
      })

    })  

    const getAllPosts = asyncHandler(async(req:Request, res:Response)=>{
      const posts = await getPosts(postRepository)
      res.json({
        status: 'success',
        message:"posts fetched successfully",
        posts
      })

    })

    return {
      getAllUsers,
      blockAndUnBlockUser,
      getAllPosts
    }
} 