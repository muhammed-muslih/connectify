import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import asyncHandler from "express-async-handler"
import { CustomRequest } from "@interfaces/customRequestInterface"
import { Request, Response } from "express"
import { userSearch ,findUser,followAndUnfollowUser,saveUnSavePosts,getUserSavedPosts,allUsers} from "@application/useCases/user/user"



export const userController = (
    userRepoImpl : UserRepoImpl,
    userRepoInterface : UserRepoInterface
)=>{

    const userRepository = userRepoInterface(userRepoImpl())

    const searchUser = asyncHandler(async(req:CustomRequest ,res:Response) => {
      const {searchValue} = req.body
      if(!searchValue){
        res.json({
          status:'success',
          message:'no user found',
          users:[]

        })
      }else{
        const users = await userSearch(searchValue,userRepository)
        res.json({
            status : 'success',
            message :'user fetched successfully',
            users
        })
      }
    })
    
    const getUser = asyncHandler(async(req:CustomRequest ,res:Response) => {
      const {id } = req.params
      const user = await findUser(id,userRepository)
      res.json({
        status : 'success',
        message:'user found successfully',
        user
      })
    })


    const followAndUnfollow = asyncHandler(async(req:CustomRequest,res:Response)=>{
      const userId = req.userId as string
      const {followedUserId} = req.params
      const result =  await followAndUnfollowUser(userId,followedUserId,userRepository)
      res.json({
        status:'success',
        ...result,
      })
    
    })

    const saveAndUnSavePosts =  asyncHandler(async(req:CustomRequest,res:Response,) => {
      const userId = req.userId as string
      const {postId} = req.body
      console.log(postId,"postId");
      
      const result = await saveUnSavePosts(userId,postId,userRepository)
      res.json({
        status: 'success',
        message : result
      })

    }) 

    const getSavedPosts = asyncHandler(async(req:CustomRequest, res:Response) =>{
      const userId = req.userId as string
      const posts = await getUserSavedPosts(userId,userRepository)
     res.json({
      status: 'success',
      saved : posts.saved
     })

    })

    
    

   return {
    searchUser,
    getUser,
    followAndUnfollow,
    saveAndUnSavePosts,
    getSavedPosts,

   }

}

export default userController