"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = require("@application/useCases/user/user");
const userController = (userRepoImpl, userRepoInterface, s3ServiceImpl, s3ServiceInt, authServices, authServiceInterface) => {
    const userRepository = userRepoInterface(userRepoImpl());
    const s3Service = s3ServiceInt(s3ServiceImpl());
    const authService = authServiceInterface(authServices());
    const searchUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { searchValue } = req.body;
        if (!searchValue) {
            res.json({
                status: "success",
                message: "no user found",
                users: [],
            });
        }
        else {
            const users = await (0, user_1.userSearch)(searchValue, userRepository);
            res.json({
                status: "success",
                message: "user fetched successfully",
                users,
            });
        }
    });
    const getUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const user = await (0, user_1.findUser)(id, userRepository);
        res.json({
            status: "success",
            message: "user found successfully",
            user,
        });
    });
    const followAndUnfollow = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { followedUserId } = req.params;
        const result = await (0, user_1.followAndUnfollowUser)(userId, followedUserId, userRepository);
        res.json({
            status: "success",
            ...result,
        });
    });
    const saveAndUnSavePosts = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { postId } = req.body;
        const result = await (0, user_1.saveUnSavePosts)(userId, postId, userRepository);
        res.json({
            status: "success",
            message: result,
        });
    });
    const getSavedPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const posts = await (0, user_1.getUserSavedPosts)(userId, userRepository);
        res.json({
            status: "success",
            saved: posts.saved,
        });
    });
    const savedPostDetails = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const posts = await (0, user_1.getSavedPostDetails)(userId, userRepository);
        res.json({
            status: "success",
            posts: posts?.saved,
        });
    });
    const UpdateUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { userName, bio, name } = req.body;
        const file = req.file;
        const result = await (0, user_1.editUserProfile)(userId, name, userName, bio, userRepository, s3Service, file ?? file);
        res.json({
            status: "success",
            message: "your profile updated successfully",
            profilePiture: result.url,
        });
    });
    const removeProfilePic = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        await (0, user_1.removeUserProfile)(userId, userRepository, s3Service);
        res.json({
            status: "success",
            message: "profile pic removed successfully",
        });
    });
    const followersDetails = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const result = await (0, user_1.getFollowersAndFollowingsDetails)(userId, userRepository);
        res.json({
            status: "success",
            message: "followers list fetched successfully",
            ...result,
        });
    });
    const comparePassword = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { password } = req.body;
        await (0, user_1.verifyPassword)(userId, password, userRepository, authService);
        res.json({
            status: "success",
            message: 'valid password'
        });
    });
    const updatePassword = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { password } = req.body;
        await (0, user_1.changePassword)(userId, password, userRepository, authService);
        res.json({
            status: "success",
            message: 'password updated successfully'
        });
    });
    const createSubscription = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { plan } = req.body;
        const session = await (0, user_1.createVerifySubscription)(userId, plan, userRepository);
        res.json({
            status: "success",
            session
        });
    });
    const verifySubscription = (0, express_async_handler_1.default)(async (req, res) => {
        const { sessionId } = req.body;
        const userId = req.userId;
        const result = await (0, user_1.verifyPayment)(userId, sessionId, userRepository);
        res.json({
            status: 'success',
            ...result
        });
    });
    return {
        searchUser,
        getUser,
        followAndUnfollow,
        saveAndUnSavePosts,
        getSavedPosts,
        savedPostDetails,
        UpdateUserProfile,
        removeProfilePic,
        followersDetails,
        comparePassword,
        updatePassword,
        createSubscription,
        verifySubscription
    };
};
exports.userController = userController;
exports.default = exports.userController;
