"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepoInterface = void 0;
const messageRepoInterface = (repository) => {
    const createMessage = async (newMessage) => await repository.createMessage(newMessage);
    const getMessages = async (chatId) => await repository.getMessages(chatId);
    return {
        createMessage,
        getMessages
    };
};
exports.messageRepoInterface = messageRepoInterface;
