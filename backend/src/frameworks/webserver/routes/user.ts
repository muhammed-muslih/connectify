import express from 'express';
import userController from '@adapters/controllers/userController';
import { userRepoImpl } from '@frameworks/database/mongoDb/repositories/userRepoImpl';
import { userRepoInterface } from '@application/repositories/userRepoInterface';


const userRouter = () => {
    const router = express.Router()
    const controller =userController (
        userRepoImpl,
        userRepoInterface
    )

   router.post('/search',controller.searchUser)
   router.get('/get-user/:id',controller.getUser)
   router.post('/:followedUserId/follow',controller.followAndUnfollow)
   router.post('/save-unsave-post',controller.saveAndUnSavePosts)
   router.get('/saved-post',controller.getSavedPosts)
   return router
}

export default userRouter