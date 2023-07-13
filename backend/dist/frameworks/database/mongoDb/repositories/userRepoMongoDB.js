"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepoMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepoMongoDB = () => {
    const registerUser = async (user) => await userModel_1.default.create(user);
    const getUserByEmail = async (email) => {
        const user = await userModel_1.default.findOne({ email });
        return user;
    };
    const getUserByUserName = async (userName) => {
        const user = await userModel_1.default.findOne({ userName });
        return user;
    };
    return {
        registerUser,
        getUserByEmail,
        getUserByUserName
    };
};
exports.userRepoMongoDB = userRepoMongoDB;
