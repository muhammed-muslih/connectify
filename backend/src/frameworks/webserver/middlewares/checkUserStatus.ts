import { userRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl";
import { CustomRequest } from "@interfaces/customRequestInterface";
import { Response,NextFunction } from "express";
import { HttpStatus } from "@interfaces/httpStatus";
import AppError from "@utils/appError";

const checkUserStatus = async(req:CustomRequest,res:Response,next:NextFunction) => {
    const userId = req.userId as string;
    if(!userId) {
        return next(new AppError("User not found", HttpStatus.BAD_REQUEST));
    }
    try {
      const user = await userRepoImpl().getUserById(userId) 
      if(!user){
        return next(new AppError("User not found", HttpStatus.BAD_REQUEST));
      }

      if(user?.isBlocked){
        return next(new AppError("Blocked user", HttpStatus.FORBIDDEN));
      }
      next()
        
    } catch (error) {
        console.log(error);
        return next(new AppError("Unauthorized User", HttpStatus.UNAUTHORIZED));
    }

}
export default checkUserStatus