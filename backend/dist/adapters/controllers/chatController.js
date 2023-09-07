"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chat_1 = require("@application/useCases/chat/chat");
const chatController = (chatRepoImpl, chatRepoInterface) => {
    const chatRepo = chatRepoInterface(chatRepoImpl());
    const acessUserChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.body;
        console.log(userId);
        const currentUserId = req.userId;
        const result = await (0, chat_1.acessChat)(currentUserId, userId, chatRepo);
        res.json({
            status: 'success',
            message: 'chat fected successfully',
        });
    });
    const fetchUserChats = (0, express_async_handler_1.default)(async (req, res) => {
        const currentUserId = req.userId;
        const result = await (0, chat_1.fetchChats)(currentUserId, chatRepo);
        res.json({
            status: 'success',
            message: 'chats fected successfully',
            chats: result
        });
    });
    const getSingleChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId } = req.params;
        const result = await (0, chat_1.getOneChat)(chatId, chatRepo);
        res.json({
            status: 'success',
            message: 'chat fected successfully',
            chat: result
        });
    });
    return {
        acessUserChat,
        fetchUserChats,
        getSingleChat
    };
};
exports.default = chatController;
