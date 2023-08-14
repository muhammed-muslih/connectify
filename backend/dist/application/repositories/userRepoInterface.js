"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepoInterface = void 0;
const userRepoInterface = (repository) => {
    const registerUser = async (user) => await repository.registerUser(user);
    const getUserByEmail = async (email) => await repository.getUserByEmail(email);
    const getUserByUserName = async (userName) => await repository.getUserByUserName(userName);
    const getUserById = async (id) => await repository.getUserById(id);
    const searchUser = async (query) => await repository.searchUser(query);
    const addUserInFollowingList = async (userId, followedUserId) => await repository.addUserInFollowingList(userId, followedUserId);
    const addUserInFollowersList = async (userId, followedUserId) => await repository.addUserInFollowersList(userId, followedUserId);
    const removeUserFromFollowingList = async (userId, unFollowedUserId) => await repository.removeUserFromFollowingList(userId, unFollowedUserId);
    const removeUserFromFollowersList = async (userId, unFollowedUserId) => await repository.removeUserFromFollowersList(userId, unFollowedUserId);
    const SavePosts = async (userId, postId) => await repository.SavePosts(userId, postId);
    const removeSavedPost = async (userId, postId) => await repository.removeSavedPost(userId, postId);
    const getSavedPost = async (userId) => await repository.getSavedPost(userId);
    const getAllUsers = async () => await repository.getAllUsers();
    const blockAndUnblock = async (userId, status) => await repository.blockAndUnblock(userId, status);
    const getSavedPostDetails = async (userId) => await repository.getSavedPostDetails(userId);
    const editUserProfile = async (userId, updateFields) => await repository.editUserProfile(userId, updateFields);
    const removeUserProfilePic = async (userId) => await repository.removeUserProfilePic(userId);
    const getFollowLists = async (userId) => await repository.getFollowLists(userId);
    return {
        registerUser,
        getUserByEmail,
        getUserByUserName,
        getUserById,
        searchUser,
        addUserInFollowingList,
        addUserInFollowersList,
        removeUserFromFollowingList,
        removeUserFromFollowersList,
        SavePosts,
        removeSavedPost,
        getSavedPost,
        getAllUsers,
        blockAndUnblock,
        getSavedPostDetails,
        editUserProfile,
        removeUserProfilePic,
        getFollowLists
    };
};
exports.userRepoInterface = userRepoInterface;
