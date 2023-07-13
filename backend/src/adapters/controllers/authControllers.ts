import {Request,Response} from "express"
import { UserRepoMongoDB} from "@frameworks/database/mongoDb/repositories/userRepoMongoDB"
import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import { AuthServices } from "@frameworks/services/authServices"
import { AuthServicesInterface } from "@application/services/authServiceInterface"
import asyncHandler from "express-async-handler"
import { CreateUserInterface } from "@interfaces/userInterfaces"
import { userRegister ,userLogin} from "@application/useCases/auth/userAuth"
import { adminLogin } from "@application/useCases/auth/adminAuth"
import { AdminRepoMongoDB } from "@frameworks/database/mongoDb/repositories/adminRepoMongoDB"
import { AdminRepoInterface } from "@application/repositories/adminRepoInterface"

export  const authController = (
     userDbRepoImpl: UserRepoMongoDB,
     userDbRepo: UserRepoInterface,
     authServiceImpl : AuthServices,
     authService :AuthServicesInterface,
     adminDbImpl : AdminRepoMongoDB,
     adminDbRepo : AdminRepoInterface

) =>{

    const dbRepositoryUser = userDbRepo(userDbRepoImpl())
    const authServices = authService(authServiceImpl())
    const dbRepositoryAdmin = adminDbRepo(adminDbImpl())


    const registerUser = asyncHandler(async(req :Request,res :Response) =>{
        const user : CreateUserInterface = req.body
        const token = await userRegister(user,dbRepositoryUser,authServices)
        res.json({
            status:"success",
            message:"new user registered",
            token
        })
    })

    const loginUser = asyncHandler(async(req :Request,res :Response) =>{
        const {userName,password} : {userName : string,password : string} = req.body  
        const token = await userLogin(userName,password,dbRepositoryUser,authServices)
        res.json({
            status:"success",
            message:"user verified",
            token
        })
    })

    const loginAdmin = asyncHandler(async(req : Request,res :Response)=>{
        const {email,password} : {email : string,password : string} = req.body
        const token = await adminLogin(email,password,dbRepositoryAdmin,authServices)
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