"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.createMessage = void 0;
const appError_1 = __importDefault(require("@utils/appError"));
const httpStatus_1 = require("@interfaces/httpStatus");
const createMessage = async (userId, content, chatId, messageRepo) => {
    if (!content || !chatId) {
        throw new appError_1.default('invalid datas', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const newMessage = {
        sender: userId,
        content,
        chatId
    };
    return await messageRepo.createMessage(newMessage);
};
exports.createMessage = createMessage;
const getMessages = async (chatId, messageRepo) => {
    if (!chatId) {
        throw new appError_1.default('chatId not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return await messageRepo.getMessages(chatId);
};
exports.getMessages = getMessages;
