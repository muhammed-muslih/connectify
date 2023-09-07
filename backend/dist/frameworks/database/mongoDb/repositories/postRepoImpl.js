"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepoImpl = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const appError_1 = __importDefault(require("@utils/appError"));
const httpStatus_1 = require("@interfaces/httpStatus");
const mongoose_1 = __importDefault(require("mongoose"));
const postRepoImpl = () => {
    const createPost = async (userId, newPost) => {
        return await postModel_1.default.create({ userId, ...newPost });
    };
    const getAllPosts = async (skip, limit) => {
        const posts = await postModel_1.default.find({ delete: false })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .populate({ path: "userId", select: "-password" })
            .populate({
            path: "comments.postedBy",
            select: "profilePicture userName",
        })
            .populate({
            path: "comments.replies.postedBy",
            select: "profilePicture userName",
        });
        return posts;
    };
    const getuserPosts = async (userId) => await postModel_1.default.find({ delete: false, userId }).sort({ date: -1 });
    const getSinglePost = async (postId) => await postModel_1.default.findById({ _id: postId });
    const likeOrDislike = async (userId, postId) => {
        try {
            const post = await getSinglePost(postId);
            if (!post) {
                throw new appError_1.default("post not found", httpStatus_1.HttpStatus.BAD_REQUEST);
            }
            const validUserId = new mongoose_1.default.Types.ObjectId(userId);
            const isLiked = post.likes.includes(validUserId);
            let message;
            if (!isLiked) {
                post.likes.push(validUserId);
                if (userId !== post.userId.toString()) {
                    const newNotification = {
                        receiver: post.userId,
                        user: userId,
                        content: "liked your post",
                        postId,
                    };
                    notificationModel_1.default.create(newNotification);
                }
                message = "Post liked successfully";
            }
            else {
                post.likes = post.likes.filter((userId) => userId.toString() !== validUserId.toString());
                const res = await notificationModel_1.default.findOneAndDelete({
                    user: userId,
                    postId: postId,
                });
                console.log(res);
                message = "Post disliked successfully";
            }
            await post.save();
            return {
                post,
                message,
            };
        }
        catch (error) {
            console.log(error);
        }
    };
    const createRootComment = async (comment, postId) => {
        const result = await postModel_1.default.findByIdAndUpdate({ _id: postId }, { $push: { comments: comment } }, { new: true });
        return result;
    };
    const deleteRootComment = async (postId, commentId) => {
        return await postModel_1.default.findByIdAndUpdate(postId, {
            $pull: { comments: { _id: commentId } },
        });
    };
    const replayComment = async (replay, postId, commentId) => {
        const query = { _id: postId, "comments._id": commentId };
        const update = { $push: { "comments.$.replies": replay } };
        await postModel_1.default.updateOne(query, update);
        const updatedPost = await postModel_1.default.findOne(query);
        const updatedComment = updatedPost?.comments.find((comment) => comment._id?.toString() === commentId);
        const newReplyId = updatedComment?.replies[updatedComment.replies.length - 1];
        return newReplyId;
    };
    const reportPost = async (postId, report) => {
        return await postModel_1.default.findByIdAndUpdate(postId, {
            $addToSet: { report: report },
        });
    };
    const editPost = async (postId, description) => {
        return await postModel_1.default.updateOne({ _id: postId }, { $set: { description: description } });
    };
    const deletePost = async (postId) => {
        const result = await postModel_1.default.findByIdAndDelete(postId);
        await notificationModel_1.default.deleteMany({ postId });
        return result;
    };
    const getSinglePostDetails = async (postId) => await postModel_1.default.findById({ _id: postId })
        .populate({
        path: "userId",
        select: "-followings -followers -saved -bio -password -isBlocked",
    })
        .populate({
        path: "comments.postedBy",
        select: "-followings -followers -saved -bio -password -isBlocked",
    })
        .populate({
        path: "comments.replies.postedBy",
        select: "-followings -followers -saved -bio -password -isBlocked",
    });
    const getPosts = async () => await postModel_1.default.find()
        .sort({ date: -1 })
        .select("-comments")
        .populate({
        path: "userId",
        select: "-followings -followers -saved -bio -password -profilePicName  -updatedAt",
    })
        .populate({
        path: "report.reportedBy",
        select: "-followings -followers -saved -bio -password -profilePicName  -updatedAt",
    });
    const getPostsStatistics = async () => {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const startOfWeek = new Date();
        startOfWeek.setUTCDate(today.getUTCDate() - today.getUTCDay());
        startOfWeek.setUTCHours(0, 0, 0, 0);
        const startOfMonth = new Date(today.getUTCFullYear(), today.getUTCMonth(), 1);
        startOfMonth.setUTCHours(0, 0, 0, 0);
        return await postModel_1.default.aggregate([
            {
                $facet: {
                    totalPosts: [{ $count: "count" }],
                    postsToday: [
                        { $match: { date: { $gte: today } } },
                        { $count: "count" },
                    ],
                    postsThisWeek: [
                        { $match: { date: { $gte: startOfWeek } } },
                        { $count: "count" },
                    ],
                    postsThisMonth: [
                        { $match: { date: { $gte: startOfMonth } } },
                        { $count: "count" },
                    ],
                },
            },
        ]);
    };
    return {
        createPost,
        getAllPosts,
        getuserPosts,
        getSinglePost,
        likeOrDislike,
        createRootComment,
        replayComment,
        reportPost,
        editPost,
        deletePost,
        getSinglePostDetails,
        deleteRootComment,
        getPosts,
        getPostsStatistics
    };
};
exports.postRepoImpl = postRepoImpl;
