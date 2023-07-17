import express from 'express'
import authController from '@adapters/controllers/authControllers'
import { userRepoImpl } from '@frameworks/database/mongoDb/repositories/userRepoImpl'
import { userRepoInterface } from '@application/repositories/userRepoInterface'
import { authServices } from '@frameworks/services/authServices'
import { authServiceInterface } from '@application/services/authServiceInterface'
import { adminRepoInterface } from '@application/repositories/adminRepoInterface'
import { adminRepoImpl} from '@frameworks/database/mongoDb/repositories/adminRepoImpl'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { userRegisterSchema ,userLoginSchema,adminLoginSchema} from '@validation/authValidation'

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

    router.post('/register',validationMiddleware(userRegisterSchema),controller.registerUser)
    router.post('/user-login',validationMiddleware(userLoginSchema),controller.loginUser)
    router.post('/admin-login',validationMiddleware(adminLoginSchema),controller.loginAdmin)
    return router
}

export default authRouter
