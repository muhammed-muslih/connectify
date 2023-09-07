"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepoInterface = void 0;
const chatRepoInterface = (repository) => {
    const isChatExist = async (currentUserId, userId) => await repository.isChatExist(currentUserId, userId);
    const createChat = async (currentUserId, userId) => await repository.createChat(currentUserId, userId);
    const getSingleChatById = async (chatId) => await repository.getSingleChatById(chatId);
    const getAllChats = async (curretUsserId) => repository.getAllChats(curretUsserId);
    const getOneChat = async (chatId) => repository.getOneChat(chatId);
    return {
        isChatExist,
        createChat,
        getSingleChatById,
        getAllChats,
        getOneChat
    };
};
exports.chatRepoInterface = chatRepoInterface;
