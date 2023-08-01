import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import asyncHandler from "express-async-handler"
import { allUsers ,changeUserStatus } from "@application/useCases/user/user"
import { Request,Response } from "express"


export const adminController = (
    userRepoImpl : UserRepoImpl,
    userRepoInterface : UserRepoInterface
) =>{

    const userRepository = userRepoInterface(userRepoImpl())

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


    return {
      getAllUsers,
      blockAndUnBlockUser
    }
} 