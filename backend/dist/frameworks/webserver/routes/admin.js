"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("@adapters/controllers/adminController");
const userRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/userRepoImpl");
const userRepoInterface_1 = require("@application/repositories/userRepoInterface");
const postRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/postRepoImpl");
const postRepoInterface_1 = require("@application/repositories/postRepoInterface");
const s3BucketServie_1 = require("@frameworks/services/s3BucketServie");
const s3ServiceInterface_1 = require("@application/services/s3ServiceInterface");
const adminRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, adminController_1.adminController)(userRepoImpl_1.userRepoImpl, userRepoInterface_1.userRepoInterface, postRepoImpl_1.postRepoImpl, postRepoInterface_1.postRepoInterface, s3BucketServie_1.s3ServiceImpl, s3ServiceInterface_1.s3serviceInterface);
    router.get("/get-all-users", controller.getAllUsers);
    router.patch("/block-unblock-user", controller.blockAndUnBlockUser);
    router.get("/get-all-posts", controller.getAllPosts);
    router.delete("/delete-post", controller.removePost);
    router.get('/get-dashboard-users-data', controller.getDashBoardDatasForUsers);
    router.get('/get-dashboard-posts-data', controller.getDashBoardDatasForPosts);
    return router;
};
exports.default = adminRouter;
