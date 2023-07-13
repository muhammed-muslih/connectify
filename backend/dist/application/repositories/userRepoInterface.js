"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepoInterface = void 0;
const userRepoInterface = (repository) => {
    const registerUser = async (user) => await repository.registerUser(user);
    const getUserByEmail = async (email) => await repository.getUserByEmail(email);
    const getUserByUserName = async (userName) => await repository.getUserByUserName(userName);
    return {
        registerUser,
        getUserByEmail,
        getUserByUserName
    };
};
exports.userRepoInterface = userRepoInterface;
