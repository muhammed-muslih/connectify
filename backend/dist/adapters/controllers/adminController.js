"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = require("@application/useCases/user/user");
const posts_1 = require("@application/useCases/post/posts");
const adminController = (userRepoImpl, userRepoInterface, postRepoImpl, postRepoInterface, s3ServiceImpl, s3ServiceInterface) => {
    const userRepository = userRepoInterface(userRepoImpl());
    const postRepository = postRepoInterface(postRepoImpl());
    const s3Service = s3ServiceInterface(s3ServiceImpl());
    const getAllUsers = (0, express_async_handler_1.default)(async (req, res) => {
        const users = await (0, user_1.allUsers)(userRepository);
        res.json({
            status: "success",
            users,
        });
    });
    const blockAndUnBlockUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.body;
        const result = await (0, user_1.changeUserStatus)(userId, userRepository);
        res.json({
            status: "success",
            message: result,
        });
    });
    const getAllPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const posts = await (0, posts_1.getPosts)(postRepository);
        res.json({
            status: "success",
            message: "posts fetched successfully",
            posts,
        });
    });
    const removePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId, postId } = req.body;
        await (0, posts_1.deletePost)(userId, postId, postRepository, s3Service);
        res.json({
            status: "success",
            message: "post deleted successfully",
        });
    });
    const getDashBoardDatasForUsers = (0, express_async_handler_1.default)(async (req, res) => {
        const users = await (0, user_1.getUserSummary)(userRepository);
        res.json({
            status: 'success',
            message: 'data fetched successfully',
            ...users
        });
    });
    const getDashBoardDatasForPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const posts = await (0, posts_1.getPostStatistics)(postRepository);
        res.json({
            status: 'success',
            message: 'data fetched successfully',
            posts
        });
    });
    return {
        getAllUsers,
        blockAndUnBlockUser,
        getAllPosts,
        removePost,
        getDashBoardDatasForUsers,
        getDashBoardDatasForPosts
    };
};
exports.adminController = adminController;
