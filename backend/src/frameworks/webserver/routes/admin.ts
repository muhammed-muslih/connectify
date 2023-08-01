import express from 'express'
import { adminController } from '@adapters/controllers/adminController'
import { userRepoImpl } from '@frameworks/database/mongoDb/repositories/userRepoImpl'
import { userRepoInterface } from '@application/repositories/userRepoInterface'


const adminRouter = ( ) => {
    const router = express.Router()
    const controller = adminController(userRepoImpl,userRepoInterface)
    
    router.get('/get-alluser',controller.getAllUsers)
    router.patch('/block-unblock-user',controller.blockAndUnBlockUser)

    return router
}

export default adminRouter