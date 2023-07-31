import express from 'express';
import userAuthMid from '../middlewares/userAuthMid';
import userController from '@adapters/controllers/userController';
import { userRepoImpl } from '@frameworks/database/mongoDb/repositories/userRepoImpl';
import { userRepoInterface } from '@application/repositories/userRepoInterface';

const userRouter = () => {
    const router = express.Router()
    const controller =userController (
        userRepoImpl,
        userRepoInterface
    )

   router.post('/search',userAuthMid,controller.searchUser)
   router.get('/get-user/:id',userAuthMid,controller.getUser)
   router.post('/:followedUserId/follow',userAuthMid,controller.followAndUnfollow)
   return router
}

export default userRouter