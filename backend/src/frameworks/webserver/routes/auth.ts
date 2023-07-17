import express from 'express'
import authController from '@adapters/controllers/authControllers'
import { userRepoImpl } from '@frameworks/database/mongoDb/repositories/userRepoImpl'
import { userRepoInterface } from '@application/repositories/userRepoInterface'
import { authServices } from '@frameworks/services/authServices'
import { authServiceInterface } from '@application/services/authServiceInterface'
import { adminRepoInterface } from '@application/repositories/adminRepoInterface'
import { adminRepoImpl} from '@frameworks/database/mongoDb/repositories/adminRepoImpl'


const authRouter = ()=>{
    const router = express.Router()
    const controller = authController(
        userRepoImpl,
        userRepoInterface,
        authServices,
        authServiceInterface,
        adminRepoImpl,
        adminRepoInterface
    )

    router.post('/register',controller.registerUser)
    router.post('/user-login',controller.loginUser)
    router.post('/admin-login',controller.loginAdmin)
    return router
}

export default authRouter
