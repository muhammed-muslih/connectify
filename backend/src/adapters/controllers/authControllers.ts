import {Request,Response} from "express"
import { UserRepoImpl} from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import { AuthServices } from "@frameworks/services/authServices"
import { AuthServicesInterface } from "@application/services/authServiceInterface"
import asyncHandler from "express-async-handler"
import { UserRegisterType,UserLoginType,AdminLoginType} from "@validation/authValidation"
import { userRegister ,userLogin,loginWithGoogle} from "@application/useCases/auth/userAuth"
import { adminLogin } from "@application/useCases/auth/adminAuth"
import { AdminRepoImpl } from "@frameworks/database/mongoDb/repositories/adminRepoImpl"
import { AdminRepoInterface } from "@application/repositories/adminRepoInterface"
import { GoogleAuthService } from "@frameworks/services/googleAuthService"
import { GoogleAuthServiceInterface } from "@application/services/googleAuthServiceInterface"

export  const authController = (
     userDbRepoImpl: UserRepoImpl,
     userDbRepoInt: UserRepoInterface,
     authServiceImpl : AuthServices,
     authServiceInt :AuthServicesInterface,
     adminDbImpl : AdminRepoImpl,
     adminDbRepoInt : AdminRepoInterface,
     googleAuthServiceImpl : GoogleAuthService,
     googleAuthServiceInt:GoogleAuthServiceInterface

) =>{

    const userRepository = userDbRepoInt(userDbRepoImpl())
    const authServices = authServiceInt(authServiceImpl())
    const adminRepository = adminDbRepoInt(adminDbImpl())
    const googleAuthService = googleAuthServiceInt(googleAuthServiceImpl())


    const registerUser = asyncHandler(async(req :Request,res :Response) =>{
        const user : UserRegisterType = req.body
        const result= await userRegister(user,userRepository,authServices)
        res.json({
            status:"success",
            message:"new user registered",
            token:result.token,
            _id:result.userId 
        })
    })

    const loginUser = asyncHandler(async(req :Request,res :Response) =>{
        const {userName,password} :UserLoginType = req.body  
        const result = await userLogin(userName,password,userRepository,authServices)
        res.json({
            status:"success",
            message:"user verified",
            token:result.token,
            _id:result.userId
        })
    })

    const loginAdmin = asyncHandler(async(req : Request,res :Response)=>{
        const {email,password} : AdminLoginType = req.body
        const token = await adminLogin(email,password,adminRepository,authServices)
        res.json({
            status:"success",
            message : "admin verified",
            token
        })
        
    })

    const googleLogin = async (req:Request,res : Response) => {
        const {credential} :{credential : string} = req.body
        const userData = await loginWithGoogle(credential,googleAuthService,userRepository,authServices)
        res.json({
            status:"success",
            message:'user verified',
            token:userData.token,
            userName:userData.userName,
            _id:userData.userId
        })
        
    }


    return {
        registerUser,
        loginUser,
        loginAdmin,
        googleLogin
    }
  
}

export default authController