"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepoImpl = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
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
        const regexPattern = new RegExp(`^${query}`, 'i');
        return await userModel_1.default.find({ userName: regexPattern });
    };
    const addUserInFollowingList = async (userId, followedUserId) => {
        return await userModel_1.default.findByIdAndUpdate(userId, { $addToSet: { followings: followedUserId } });
    };
    const addUserInFollowersList = async (userId, followedUserId) => {
        return await userModel_1.default.findByIdAndUpdate(followedUserId, { $addToSet: { followers: userId } });
    };
    const removeUserFromFollowingList = async (userId, unFollowedUserId) => {
        return await userModel_1.default.findByIdAndUpdate(userId, { $pull: { followings: unFollowedUserId } });
    };
    const removeUserFromFollowersList = async (userId, unFollowedUserId) => {
        return await userModel_1.default.findByIdAndUpdate(unFollowedUserId, { $pull: { followers: userId } });
    };
    return {
        registerUser,
        getUserByEmail,
        getUserByUserName,
        getUserById,
        searchUser,
        addUserInFollowersList,
        addUserInFollowingList,
        removeUserFromFollowersList,
        removeUserFromFollowingList
    };
};
exports.userRepoImpl = userRepoImpl;
