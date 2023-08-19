import express from 'express'
import { adminController } from '@adapters/controllers/adminController'
import { userRepoImpl } from '@frameworks/database/mongoDb/repositories/userRepoImpl'
import { userRepoInterface } from '@application/repositories/userRepoInterface'
import { postRepoImpl } from '@frameworks/database/mongoDb/repositories/postRepoImpl'
import { postRepoInterface } from '@application/repositories/postRepoInterface'


const adminRouter = ( ) => {
    const router = express.Router()
    const controller = adminController(userRepoImpl,userRepoInterface,postRepoImpl,postRepoInterface)
    
    router.get('/get-alluser',controller.getAllUsers)
    router.patch('/block-unblock-user',controller.blockAndUnBlockUser)
    router.get('/get-all-posts',controller.getAllPosts)

    return router
}

export default adminRouter