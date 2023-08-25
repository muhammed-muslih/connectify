import express from "express";
import { adminController } from "@adapters/controllers/adminController";
import { userRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl";
import { userRepoInterface } from "@application/repositories/userRepoInterface";
import { postRepoImpl } from "@frameworks/database/mongoDb/repositories/postRepoImpl";
import { postRepoInterface } from "@application/repositories/postRepoInterface";
import { s3ServiceImpl } from "@frameworks/services/s3BucketServie";
import { s3serviceInterface } from "@application/services/s3ServiceInterface";

const adminRouter = () => {
  const router = express.Router();
  const controller = adminController(
    userRepoImpl,
    userRepoInterface,
    postRepoImpl,
    postRepoInterface,
    s3ServiceImpl,
    s3serviceInterface
  );

  router.get("/get-all-users", controller.getAllUsers);
  router.patch("/block-unblock-user", controller.blockAndUnBlockUser);
  router.get("/get-all-posts", controller.getAllPosts);
  router.delete("/delete-post", controller.removePost);
  router.get('/get-dashboard-users-data',controller.getDashBoardDatasForUsers)
  router.get('/get-dashboard-posts-data',controller.getDashBoardDatasForPosts)

  return router;
};

export default adminRouter;
