import express from 'express'
import upload from '../middlewares/multer'
import { postController } from '@adapters/controllers/postController'
import { s3ServiceImpl } from '@frameworks/services/s3BucketServie'
import { s3serviceInterface } from '@application/services/s3ServiceInterface'
import { postRepoImpl} from '@frameworks/database/mongoDb/repositories/postRepoImpl'
import { postRepoInterface } from '@application/repositories/postRepoInterface'

const postRouter = () => {
    const router = express.Router()
    const controller = postController(
        s3ServiceImpl,
        s3serviceInterface,
        postRepoImpl,
        postRepoInterface
    )

    router.post('/add-post',upload,controller.uploadPostAndGetUrl)
    router.get('/',controller.findAllPosts)
    router.get('/user-posts/:userId',controller.getUserPost)
    router.post('/post-like',controller.postLikeAndDislike)
    router.post('/comment/:postId',controller.createRootComment)
    router.post('/comment/:postId/reply/:commentId',controller.replayComment)

    return router
}
export default postRouter