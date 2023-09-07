"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostStatistics = exports.getPosts = exports.getSinglePost = exports.deletePost = exports.editPost = exports.reportPost = exports.setReplayComment = exports.deleteComment = exports.createComment = exports.postLikeOrDislike = exports.userPosts = exports.getAllPosts = exports.addPostAndGetUrl = void 0;
const appError_1 = __importDefault(require("@utils/appError"));
const httpStatus_1 = require("@interfaces/httpStatus");
const addPostAndGetUrl = async (userId, description, file, postRepository, s3Service) => {
    const postPic = true;
    const result = await s3Service.uploadAndGetUrl(file, postPic);
    const post = { description, imageName: result?.imageName, imageUrl: result?.url };
    const addPost = await postRepository.createPost(userId, post);
    if (!addPost) {
        throw new appError_1.default("post not created", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return addPost;
};
exports.addPostAndGetUrl = addPostAndGetUrl;
const getAllPosts = (page, limit, postRepository) => {
    let skip = (page - 1) * limit;
    const allPosts = postRepository.getAllPosts(skip, limit);
    if (!allPosts) {
        throw new appError_1.default("posts are not available", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return allPosts;
};
exports.getAllPosts = getAllPosts;
const userPosts = (userId, postRepository) => {
    const posts = postRepository.getUserPosts(userId);
    return posts;
};
exports.userPosts = userPosts;
const postLikeOrDislike = async (userId, postId, postRepository) => {
    const result = await postRepository.likeOrDislike(userId, postId);
    return result;
};
exports.postLikeOrDislike = postLikeOrDislike;
const createComment = async (userId, postId, text, postRepository) => {
    const comment = {
        postedBy: userId,
        text: text
    };
    const result = await postRepository.createRootComment(comment, postId);
    return result;
};
exports.createComment = createComment;
const deleteComment = async (postId, commentId, postRepository) => {
    if (!postId || !commentId) {
        throw new appError_1.default('credentials not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return await postRepository.deleteRootComment(postId, commentId);
};
exports.deleteComment = deleteComment;
const setReplayComment = async (userId, postId, commentId, text, postRepository) => {
    const replay = {
        postedBy: userId,
        text: text
    };
    const result = await postRepository.replayComment(replay, postId, commentId);
    return result;
};
exports.setReplayComment = setReplayComment;
const reportPost = async (userId, postId, text, postRepository) => {
    const post = await postRepository.getSinglePost(postId);
    if (!post) {
        throw new appError_1.default('post not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    if (post.userId.toString() === userId) {
        throw new appError_1.default("you can't report this post", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isReportedUser = post.report.find((post) => post.reportedBy?.toString() === userId);
    if (isReportedUser) {
        return {
            message: 'you already reported this post'
        };
    }
    else {
        const report = { text, reportedBy: userId };
        await postRepository.reportPost(postId, report);
        return {
            message: 'post reported'
        };
    }
};
exports.reportPost = reportPost;
const editPost = async (userId, postId, description, postRepository) => {
    const post = await postRepository.getSinglePost(postId);
    if (!post) {
        throw new appError_1.default('post not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    if (post.userId.toString() !== userId) {
        throw new appError_1.default("you can't edit this post", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return await postRepository.editPost(postId, description);
};
exports.editPost = editPost;
const deletePost = async (userId, postId, postRepository, s3Service) => {
    const post = await postRepository.getSinglePost(postId);
    if (!post) {
        throw new appError_1.default('post not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    if (post.userId.toString() !== userId) {
        throw new appError_1.default("you can't delete this post", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const fileName = post.imageName;
    if (fileName) {
        await s3Service.removeFile(fileName);
    }
    return await postRepository.deletePost(postId);
};
exports.deletePost = deletePost;
const getSinglePost = async (postId, postRepository) => {
    if (!postId) {
        throw new appError_1.default('postId not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return await postRepository.getSinglePostDetails(postId);
};
exports.getSinglePost = getSinglePost;
const getPosts = async (postRepository) => {
    return await postRepository.getPosts();
};
exports.getPosts = getPosts;
const getPostStatistics = async (postRepository) => {
    const post = await postRepository.getPostsStatistics();
    const transformedResult = {
        totalPosts: post[0].totalPosts[0]?.count || 0,
        postsToday: post[0].postsToday[0]?.count || 0,
        postsThisWeek: post[0].postsThisWeek[0]?.count || 0,
        postsThisMonth: post[0].postsThisMonth[0]?.count || 0
    };
    return transformedResult;
};
exports.getPostStatistics = getPostStatistics;
