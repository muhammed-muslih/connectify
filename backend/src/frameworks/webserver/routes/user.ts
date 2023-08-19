import express from 'express';
import userController from '@adapters/controllers/userController';
import { userRepoImpl } from '@frameworks/database/mongoDb/repositories/userRepoImpl';
import { userRepoInterface } from '@application/repositories/userRepoInterface';
import { s3ServiceImpl } from '@frameworks/services/s3BucketServie';
import { s3serviceInterface } from '@application/services/s3ServiceInterface';
import { authServices } from '@frameworks/services/authServices';
import { authServiceInterface } from '@application/services/authServiceInterface';
import upload from '../middlewares/multer'



const userRouter = () => {
    const router = express.Router()
    const controller =userController (
        userRepoImpl,
        userRepoInterface,
        s3ServiceImpl,
        s3serviceInterface,
        authServices,
        authServiceInterface
    )

   router.post('/search',controller.searchUser)
   router.get('/get-user/:id',controller.getUser)
   router.post('/:followedUserId/follow',controller.followAndUnfollow)
   router.post('/save-unsave-post',controller.saveAndUnSavePosts)
   router.get('/saved-post',controller.getSavedPosts)
   router.get('/saved-post-details',controller.savedPostDetails)
   router.patch('/update-profile',upload.single('profilePic'),controller.UpdateUserProfile)
   router.patch('/remove-profile-pic',controller.removeProfilePic)
   router.get('/followers-followings-list',controller.followersDetails)
   router.post('/verify-password',controller.comparePassword)
   router.put('/update-password',controller.updatePassword)
   return router
}

export default userRouter