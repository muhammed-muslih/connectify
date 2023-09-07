"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepoImpl = void 0;
const chatModel_1 = __importDefault(require("../models/chatModel"));
const chatRepoImpl = () => {
    const isChatExist = async (currentUserId, userId) => {
        return await chatModel_1.default.findOne({
            $and: [
                { users: { $elemMatch: { $eq: currentUserId } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate({ path: "users", select: "userName profilePicture" })
            .populate("latestMessage");
    };
    const createChat = async (currentUserId, userId) => {
        const users = [currentUserId, userId];
        return await chatModel_1.default.create({ users });
    };
    const getSingleChatById = async (chatId) => {
        return await chatModel_1.default.findById(chatId)
            .populate({ path: "users", select: "userName profilePicture" })
            .populate("latestMessage");
    };
    const getAllChats = async (currentUserId) => {
        const chats = await chatModel_1.default.find({
            users: { $in: [currentUserId] }
        })
            .populate({ path: "users", select: "userName profilePicture" })
            .populate({ path: 'latestMessage', select: 'content' })
            .sort({ updatedAt: -1 });
        return chats;
    };
    const getOneChat = async (chatId) => {
        return await chatModel_1.default.findById(chatId)
            .populate({ path: "users", select: "userName" });
    };
    return {
        isChatExist,
        createChat,
        getSingleChatById,
        getAllChats,
        getOneChat
    };
};
exports.chatRepoImpl = chatRepoImpl;
