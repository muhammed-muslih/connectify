"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const postController_1 = require("@adapters/controllers/postController");
const s3BucketServie_1 = require("@frameworks/services/s3BucketServie");
const s3ServiceInterface_1 = require("@application/services/s3ServiceInterface");
const postRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/postRepoImpl");
const postRepoInterface_1 = require("@application/repositories/postRepoInterface");
const postRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, postController_1.postController)(s3BucketServie_1.s3ServiceImpl, s3ServiceInterface_1.s3serviceInterface, postRepoImpl_1.postRepoImpl, postRepoInterface_1.postRepoInterface);
    router.post("/add-post", multer_1.default.single("image"), controller.uploadPostAndGetUrl);
    router.get("/", controller.findAllPosts);
    router.get("/user-posts/:userId", controller.getUserPost);
    router.post("/post-like", controller.postLikeAndDislike);
    router.post("/comment/:postId", controller.createRootComment);
    router.post("/comment/:postId/reply/:commentId", controller.replayComment);
    router.patch("/report/:postId", controller.postReport);
    router.patch("/edit/:postId", controller.postEdit);
    router.delete("/delete/:postId", controller.postDelete);
    router.get('/:postId', controller.singlePost);
    router.put('/:postId/delete/:commentId', controller.deleteRootComment);
    return router;
};
exports.default = postRouter;
