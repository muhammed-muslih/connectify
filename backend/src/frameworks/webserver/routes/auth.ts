import express from 'express'
import authController from '@adapters/controllers/authControllers'
import { userRepoMongoDB } from '@frameworks/database/mongoDb/repositories/userRepoMongoDB'
import { userRepoInterface } from '@application/repositories/userRepoInterface'
import { authServices } from '@frameworks/services/authServices'
import { authServiceInterface } from '@application/services/authServiceInterface'
import { adminRepoInterface } from '@application/repositories/adminRepoInterface'
import { adminRepoMongoDB } from '@frameworks/database/mongoDb/repositories/adminRepoMongoDB'


const authRouter = ()=>{
    const router = express.Router()
    const controller = authController(
        userRepoMongoDB,
        userRepoInterface,
        authServices,
        authServiceInterface,
        adminRepoMongoDB,
        adminRepoInterface
    )

    router.post('/register',controller.registerUser)
    router.post('/user-login',controller.loginUser)
    router.post('/admin-login',controller.loginAdmin)
    return router
}

export default authRouter
