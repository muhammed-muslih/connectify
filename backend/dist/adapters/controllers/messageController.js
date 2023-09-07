"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_1 = require("@application/useCases/message/message");
const messageController = (messageRepoImpl, messageRepoInterface) => {
    const messageRepo = messageRepoInterface(messageRepoImpl());
    const createNewMessage = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const { content, chatId } = req.body;
        const message = await (0, message_1.createMessage)(userId, content, chatId, messageRepo);
        res.json({
            status: 'success',
            message: 'new mesage created successfully',
        });
    });
    const fetchMessages = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId } = req.params;
        const data = await (0, message_1.getMessages)(chatId, messageRepo);
        res.json({
            status: 'success',
            message: 'messages fetched successfully',
            data
        });
    });
    return {
        createNewMessage,
        fetchMessages
    };
};
exports.default = messageController;
