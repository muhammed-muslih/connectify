"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepoImpl = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const chatModel_1 = __importDefault(require("../models/chatModel"));
const messageRepoImpl = () => {
    const createMessage = async (newMessage) => {
        const message = await messageModel_1.default.create(newMessage);
        await chatModel_1.default.findByIdAndUpdate(newMessage.chatId, { latestMessage: message._id });
        return message;
    };
    const getMessages = async (chatId) => await messageModel_1.default.find({ chatId });
    return {
        createMessage,
        getMessages
    };
};
exports.messageRepoImpl = messageRepoImpl;
