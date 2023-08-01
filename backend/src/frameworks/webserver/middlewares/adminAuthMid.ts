import { Request ,Response,NextFunction} from "express";
import AppError from "@utils/appError";
import { HttpStatus } from "@interfaces/httpStatus";
import { authServices } from "@frameworks/services/authServices";

const adminAuthMid = (req:Request, res:Response , next:NextFunction) => {
    let token : string | null = ''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token) {
        throw new AppError('Token Not Found',HttpStatus.UNAUTHORIZED)
    }

    try {
        const {payload} : any = authServices().verifyToken(token)
        if(payload.role !=='admin'){
            throw new AppError("UnAuthorized Admin",HttpStatus.UNAUTHORIZED)  
         }
         next()
    } catch (error) {
        throw new AppError("UnAuthorized Admin",HttpStatus.UNAUTHORIZED)
 
    }
}

export default adminAuthMid