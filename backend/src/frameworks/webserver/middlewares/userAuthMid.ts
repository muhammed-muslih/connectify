import { CustomRequest } from "@interfaces/customRequestInterface"
import { Response,NextFunction } from "express"
import AppError from "@utils/appError"
import { HttpStatus } from "@interfaces/httpStatus"
import { authServices } from "@frameworks/services/authServices"
import { userRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl"

const userAuthMid = (req:CustomRequest,res:Response,next:NextFunction) => {

    let token : string | null = ''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ') [1] 
    }
     
    if(!token){
        console.log('token not found');
        throw new AppError('token not found',HttpStatus.UNAUTHORIZED)
    }

    try {
        const {payload}:any = authServices().verifyToken(token)
        
        if(payload.role !=='user'){
           throw new AppError("UnAuthorized User",HttpStatus.UNAUTHORIZED)  
        } 
        req.userId = payload.userId
        next()
    } catch (error) {
        throw new AppError("UnAuthorized User",HttpStatus.UNAUTHORIZED)
    }

}

export default userAuthMid