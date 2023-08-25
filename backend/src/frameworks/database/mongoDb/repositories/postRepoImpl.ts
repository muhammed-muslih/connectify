import Posts from "../models/postModel";
import Notification from "../models/notificationModel";
import { NewPostInterface } from "@interfaces/postInterface";
import AppError from "@utils/appError";
import { HttpStatus } from "@interfaces/httpStatus";
import mongoose from "mongoose";
import {
  CommentInterface,
  ReportPostInterface,
} from "@interfaces/postInterface";

export const postRepoImpl = () => {
  const createPost = async (userId: string, newPost: NewPostInterface) => {
    return await Posts.create({ userId, ...newPost });
  };

  const getAllPosts = async (skip: number, limit: number) => {
    const posts = await Posts.find({ delete: false })
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

  const getuserPosts = async (userId: string) =>
    await Posts.find({ delete: false, userId }).sort({ date: -1 });

  const getSinglePost = async (postId: string) =>
    await Posts.findById({ _id: postId });

  const likeOrDislike = async (userId: string, postId: string) => {
    try {
      const post = await getSinglePost(postId);
      if (!post) {
        throw new AppError("post not found", HttpStatus.BAD_REQUEST);
      }
      const validUserId = new mongoose.Types.ObjectId(userId);
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
          Notification.create(newNotification);
        }
        message = "Post liked successfully";
      } else {
        post.likes = post.likes.filter(
          (userId) => userId.toString() !== validUserId.toString()
        );
        const res = await Notification.findOneAndDelete({
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
    } catch (error) {
      console.log(error);
    }
  };

  const createRootComment = async (
    comment: CommentInterface,
    postId: string
  ) => {
    const result = await Posts.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: comment } },
      { new: true }
    );
    return result;
  };

  const deleteRootComment = async (postId: string, commentId: string) => {
    return await Posts.findByIdAndUpdate(postId, {
      $pull: { comments: { _id: commentId } },
    });
  };

  const replayComment = async (
    replay: CommentInterface,
    postId: string,
    commentId: string
  ) => {
    const query = { _id: postId, "comments._id": commentId };
    const update = { $push: { "comments.$.replies": replay } };
    await Posts.updateOne(query, update);
    const updatedPost = await Posts.findOne(query);
    const updatedComment = updatedPost?.comments.find(
      (comment) => (comment as any)._id?.toString() === commentId
    );
    const newReplyId =
      updatedComment?.replies[updatedComment.replies.length - 1];
    return newReplyId;
  };

  const reportPost = async (postId: string, report: ReportPostInterface) => {
    return await Posts.findByIdAndUpdate(postId, {
      $addToSet: { report: report },
    });
  };

  const editPost = async (postId: string, description: string) => {
    return await Posts.updateOne(
      { _id: postId },
      { $set: { description: description } }
    );
  };

  const deletePost = async (postId: string) => {
    const result = await Posts.findByIdAndDelete(postId);
    await Notification.deleteMany({ postId });
    return result;
  };

  const getSinglePostDetails = async (postId: string) =>
    await Posts.findById({ _id: postId })
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

  const getPosts = async () =>
    await Posts.find()
      .sort({ date: -1 })
      .select("-comments")
      .populate({
        path: "userId",
        select:
          "-followings -followers -saved -bio -password -profilePicName  -updatedAt",
      })
      .populate({
        path: "report.reportedBy",
        select:
          "-followings -followers -saved -bio -password -profilePicName  -updatedAt",
      });

  const getPostsStatistics= async () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const startOfWeek = new Date();
    startOfWeek.setUTCDate(today.getUTCDate() - today.getUTCDay());
    startOfWeek.setUTCHours(0, 0, 0, 0);

    const startOfMonth = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      1
    );
    startOfMonth.setUTCHours(0, 0, 0, 0);

    return await Posts.aggregate([
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

export type PostRepoImp = typeof postRepoImpl;
