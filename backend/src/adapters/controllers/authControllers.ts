import {Request,Response} from "express"
import { UserRepoImpl} from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import { AuthServices } from "@frameworks/services/authServices"
import { AuthServicesInterface } from "@application/services/authServiceInterface"
import asyncHandler from "express-async-handler"
import { CreateUserInterface } from "@interfaces/userInterfaces"
import { userRegister ,userLogin} from "@application/useCases/auth/userAuth"
import { adminLogin } from "@application/useCases/auth/adminAuth"
import { AdminRepoImpl } from "@frameworks/database/mongoDb/repositories/adminRepoImpl"
import { AdminRepoInterface } from "@application/repositories/adminRepoInterface"

export  const authController = (
     userDbRepoImpl: UserRepoImpl,
     userDbRepo: UserRepoInterface,
     authServiceImpl : AuthServices,
     authService :AuthServicesInterface,
     adminDbImpl : AdminRepoImpl,
     adminDbRepo : AdminRepoInterface

) =>{

    const userRepository = userDbRepo(userDbRepoImpl())
    const authServices = authService(authServiceImpl())
    const adminRepository = adminDbRepo(adminDbImpl())


    const registerUser = asyncHandler(async(req :Request,res :Response) =>{
        const user : CreateUserInterface = req.body
        const token = await userRegister(user,userRepository,authServices)
        res.json({
            status:"success",
            message:"new user registered",
            token
        })
    })

    const loginUser = asyncHandler(async(req :Request,res :Response) =>{
        const {userName,password} : {userName : string,password : string} = req.body  
        const token = await userLogin(userName,password,userRepository,authServices)
        res.json({
            status:"success",
            message:"user verified",
            token
        })
    })

    const loginAdmin = asyncHandler(async(req : Request,res :Response)=>{
        const {email,password} : {email : string,password : string} = req.body
        const token = await adminLogin(email,password,adminRepository,authServices)
        res.json({
            status:"success",
            message : "admin verified",
            token
        })
        

    })


    return {
        registerUser,
        loginUser,
        loginAdmin

    }
  

}

export default authController