"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepoImpl = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const userRepoImpl = () => {
    const registerUser = async (user) => await userModel_1.default.create(user);
    const getUserByEmail = async (email) => {
        const user = await userModel_1.default.findOne({ email });
        return user;
    };
    const getUserByUserName = async (userName) => {
        const user = await userModel_1.default.findOne({ userName });
        return user;
    };
    const getUserById = async (id) => await userModel_1.default.findById(id);
    const searchUser = async (query) => {
        const regexPattern = new RegExp(`${query}`, 'i');
        return await userModel_1.default.find({ userName: regexPattern });
    };
    const addUserInFollowingList = async (userId, followedUserId) => {
        const newNotification = {
            receiver: followedUserId,
            user: userId,
            content: 'followed you'
        };
        const result = await userModel_1.default.findByIdAndUpdate(userId, { $addToSet: { followings: followedUserId } });
        await notificationModel_1.default.create(newNotification);
        return result;
    };
    const addUserInFollowersList = async (userId, followedUserId) => {
        return await userModel_1.default.findByIdAndUpdate(followedUserId, { $addToSet: { followers: userId } });
    };
    const removeUserFromFollowingList = async (userId, unFollowedUserId) => {
        await notificationModel_1.default.findOneAndDelete({
            user: userId,
            receiver: unFollowedUserId,
            postId: { $exists: false }
        });
        return await userModel_1.default.findByIdAndUpdate(userId, { $pull: { followings: unFollowedUserId } });
    };
    const removeUserFromFollowersList = async (userId, unFollowedUserId) => {
        return await userModel_1.default.findByIdAndUpdate(unFollowedUserId, { $pull: { followers: userId } });
    };
    const SavePosts = async (userId, postId) => {
        await userModel_1.default.findByIdAndUpdate(userId, { $addToSet: { saved: postId } });
    };
    const removeSavedPost = async (userId, postId) => {
        await userModel_1.default.findByIdAndUpdate(userId, { $pull: { saved: postId } });
    };
    const getSavedPost = async (userId) => await userModel_1.default.findOne({ _id: userId }).select('saved');
    const getSavedPostDetails = async (userId) => await userModel_1.default.findOne({ _id: userId })
        .populate({ path: 'saved' }).select('saved');
    const getAllUsers = async () => await userModel_1.default.find({}).sort({ createdAt: -1 });
    const blockAndUnblock = async (userId, status) => await userModel_1.default.findByIdAndUpdate(userId, { isBlocked: status });
    const editUserProfile = async (userId, updateFields) => {
        return await userModel_1.default.findByIdAndUpdate(userId, { $set: updateFields });
    };
    const removeUserProfilePic = async (userId) => await userModel_1.default.findByIdAndUpdate(userId, { $set: { profilePicture: '', profilePicName: '' } });
    const getFollowLists = async (userId) => {
        const user = await userModel_1.default.findById(userId).populate({
            path: 'followers',
            select: 'userName profilePicture'
        })
            .populate({
            path: 'followings',
            select: 'userName profilePicture'
        });
        return {
            followers: user?.followers,
            followings: user?.followings
        };
    };
    const changePassword = async (userId, password) => await userModel_1.default.findByIdAndUpdate(userId, { $set: { password: password } });
    return {
        registerUser,
        getUserByEmail,
        getUserByUserName,
        getUserById,
        searchUser,
        addUserInFollowersList,
        addUserInFollowingList,
        removeUserFromFollowersList,
        removeUserFromFollowingList,
        SavePosts,
        removeSavedPost,
        getSavedPost,
        getAllUsers,
        blockAndUnblock,
        getSavedPostDetails,
        editUserProfile,
        removeUserProfilePic,
        getFollowLists,
        changePassword
    };
};
exports.userRepoImpl = userRepoImpl;
