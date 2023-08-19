import express from "express";
import upload from "../middlewares/multer";
import { postController } from "@adapters/controllers/postController";
import { s3ServiceImpl } from "@frameworks/services/s3BucketServie";
import { s3serviceInterface } from "@application/services/s3ServiceInterface";
import { postRepoImpl } from "@frameworks/database/mongoDb/repositories/postRepoImpl";
import { postRepoInterface } from "@application/repositories/postRepoInterface";

const postRouter = () => {
  const router = express.Router();
  const controller = postController(
    s3ServiceImpl,
    s3serviceInterface,
    postRepoImpl,
    postRepoInterface
  );

  router.post(
    "/add-post",
    upload.single("image"),
    controller.uploadPostAndGetUrl
  );
  router.get("/", controller.findAllPosts);
  router.get("/user-posts/:userId", controller.getUserPost);
  router.post("/post-like", controller.postLikeAndDislike);
  router.post("/comment/:postId", controller.createRootComment);
  router.post("/comment/:postId/reply/:commentId", controller.replayComment);
  router.patch("/report/:postId", controller.postReport);
  router.patch("/edit/:postId", controller.postEdit);
  router.delete("/delete/:postId", controller.postDelete);
  router.get('/:postId',controller.singlePost)
  router.put('/:postId/delete/:commentId',controller.deleteRootComment)
  return router;
};
export default postRouter;
