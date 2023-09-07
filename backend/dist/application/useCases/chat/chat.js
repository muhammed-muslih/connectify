"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneChat = exports.fetchChats = exports.acessChat = void 0;
const appError_1 = __importDefault(require("@utils/appError"));
const httpStatus_1 = require("@interfaces/httpStatus");
const acessChat = async (currentUserId, userId, chatRepo) => {
    if (!userId) {
        throw new appError_1.default('userId not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const isChatExist = await chatRepo.isChatExist(currentUserId, userId);
    if (isChatExist) {
        return isChatExist;
    }
    const { _id } = await chatRepo.createChat(currentUserId, userId);
    const chat = await chatRepo.getSingleChatById(_id.toString());
    return chat;
};
exports.acessChat = acessChat;
const fetchChats = async (currentUserId, chatRepo) => {
    const chat = await chatRepo.getAllChats(currentUserId);
    return chat;
};
exports.fetchChats = fetchChats;
const getOneChat = async (chatId, chatRepo) => {
    const chat = await chatRepo.getOneChat(chatId);
    return chat;
};
exports.getOneChat = getOneChat;
