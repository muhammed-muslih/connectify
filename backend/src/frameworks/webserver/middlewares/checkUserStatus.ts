import { userRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl";
import { CustomRequest } from "@interfaces/customRequestInterface";
import { Response,NextFunction } from "express";
import { HttpStatus } from "@interfaces/httpStatus";
import AppError from "@utils/appError";

const checkUserStatus = async(req:CustomRequest,res:Response,next:NextFunction) => {
    const userId = req.userId as string;
    if(!userId) {
        throw new AppError('user not found',HttpStatus.BAD_REQUEST)
    }
    try {
      const user = await userRepoImpl().getUserById(userId) 
      if(!user){
        throw new AppError('user not found',HttpStatus.BAD_REQUEST)
      }

      if(user.isBlocked){
        throw new AppError('blocked user',HttpStatus.FORBIDDEN)
      }
      next()
        
    } catch (error) {
        throw new AppError("UnAuthorized User",HttpStatus.UNAUTHORIZED)  
    }

}
export default checkUserStatus