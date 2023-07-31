import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import asyncHandler from "express-async-handler"
import { CustomRequest } from "@interfaces/customRequestInterface"
import { Response } from "express"
import { userSearch ,findUser,followAndUnfollowUser} from "@application/useCases/user/user"



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
          user:[]

        })
      }else{
        const user = await userSearch(searchValue,userRepository)
        res.json({
            status : 'success',
            message :'user fetched successfully',
            user
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

    

   return {
    searchUser,
    getUser,
    followAndUnfollow
   }

}

export default userController