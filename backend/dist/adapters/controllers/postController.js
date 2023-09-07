"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const posts_1 = require("@application/useCases/post/posts");
const postController = (s3ServiceImpl, s3ServiceInterface, postRepoImpl, postRepoInterface) => {
    const s3Service = s3ServiceInterface(s3ServiceImpl());
    const postRepo = postRepoInterface(postRepoImpl());
    const uploadPostAndGetUrl = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const file = req.file;
        const { description } = req.body;
        const result = await (0, posts_1.addPostAndGetUrl)(userId, description, file, postRepo, s3Service);
        res.json({
            status: 'success',
            post: result,
            message: 'post added successfully'
        });
    });
    const findAllPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const { p, l } = req.query;
        console.log(req.query);
        const page = Number(p);
        const limit = Number(l);
        const posts = await (0, posts_1.getAllPosts)(page ?? 1, limit ?? 10, postRepo);
        res.json({
            status: 'success',
            posts
        });
    });
    const getUserPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const posts = await (0, posts_1.userPosts)(userId, postRepo);
        res.json({
            status: 'success',
            posts
        });
    });
    const postLikeAndDislike = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.body;
        const userId = req.userId;
        const result = await (0, posts_1.postLikeOrDislike)(userId, postId, postRepo);
        res.json({
            status: 'success',
            ...result,
        });
    });
    const createRootComment = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { postId } = req.params;
        const { text } = req.body;
        const result = await (0, posts_1.createComment)(userId, postId, text, postRepo);
        res.json({
            status: 'success',
            message: 'comment addedd successfully',
            result: result?.comments
        });
    });
    const replayComment = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { postId, commentId } = req.params;
        const { text } = req.body;
        const result = await (0, posts_1.setReplayComment)(userId, postId, commentId, text, postRepo);
        res.json({
            status: 'success',
            message: 'replay comment addedd successfully ',
            result
        });
    });
    const postReport = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { postId } = req.params;
        const { text } = req.body;
        const result = await (0, posts_1.reportPost)(userId, postId, text, postRepo);
        res.json({
            status: 'success',
            ...result
        });
    });
    const postEdit = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { postId } = req.params;
        const { description } = req.body;
        await (0, posts_1.editPost)(userId, postId, description, postRepo);
        res.json({
            status: 'success',
            message: "post edited successfully"
        });
    });
    const postDelete = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { postId } = req.params;
        await (0, posts_1.deletePost)(userId, postId, postRepo, s3Service);
        res.json({
            status: "success",
            message: 'post deleted successfully'
        });
    });
    const singlePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const post = await (0, posts_1.getSinglePost)(postId, postRepo);
        res.json({
            status: "success",
            message: 'post fetched successfully',
            post
        });
    });
    const deleteRootComment = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId, commentId } = req.params;
        await (0, posts_1.deleteComment)(postId, commentId, postRepo);
        res.json({
            status: "success",
            message: 'comment deleted successfully'
        });
    });
    return {
        uploadPostAndGetUrl,
        findAllPosts,
        getUserPost,
        postLikeAndDislike,
        createRootComment,
        replayComment,
        postReport,
        postEdit,
        postDelete,
        singlePost,
        deleteRootComment
    };
};
exports.postController = postController;
