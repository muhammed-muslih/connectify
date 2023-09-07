"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepoInterface = void 0;
const postRepoInterface = (repository) => {
    const createPost = async (userId, newPost) => await repository.createPost(userId, newPost);
    const getAllPosts = async (skip, limit) => await repository.getAllPosts(skip, limit);
    const getUserPosts = async (userId) => await repository.getuserPosts(userId);
    const getSinglePost = async (postId) => await repository.getSinglePost(postId);
    const likeOrDislike = async (userId, postId) => await repository.likeOrDislike(userId, postId);
    const createRootComment = async (comment, postId) => await repository.createRootComment(comment, postId);
    const deleteRootComment = async (postId, commentId) => await repository.deleteRootComment(postId, commentId);
    const replayComment = async (replay, postId, commentId) => await repository.replayComment(replay, postId, commentId);
    const reportPost = async (postId, report) => await repository.reportPost(postId, report);
    const editPost = async (postId, description) => await repository.editPost(postId, description);
    const deletePost = async (postId) => await repository.deletePost(postId);
    const getSinglePostDetails = async (postId) => await repository.getSinglePostDetails(postId);
    const getPosts = async () => await repository.getPosts();
    const getPostsStatistics = async () => await repository.getPostsStatistics();
    return {
        createPost,
        getAllPosts,
        getUserPosts,
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
exports.postRepoInterface = postRepoInterface;
