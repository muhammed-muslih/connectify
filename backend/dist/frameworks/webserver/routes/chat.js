"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = __importDefault(require("@adapters/controllers/chatController"));
const chatRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/chatRepoImpl");
const chatRepoInterface_1 = require("@application/repositories/chatRepoInterface");
const chatRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, chatController_1.default)(chatRepoImpl_1.chatRepoImpl, chatRepoInterface_1.chatRepoInterface);
    router.post('/', controller.acessUserChat);
    router.get('/', controller.fetchUserChats);
    router.get('/:chatId', controller.getSingleChat);
    return router;
};
exports.default = chatRouter;
