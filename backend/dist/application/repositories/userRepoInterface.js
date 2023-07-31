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
    return {
        registerUser,
        getUserByEmail,
        getUserByUserName,
        getUserById,
        searchUser,
        addUserInFollowingList,
        addUserInFollowersList,
        removeUserFromFollowingList,
        removeUserFromFollowersList
    };
};
exports.userRepoInterface = userRepoInterface;
