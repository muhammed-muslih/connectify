"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("@adapters/controllers/messageController"));
const messageRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/messageRepoImpl");
const messageRepoInterface_1 = require("@application/repositories/messageRepoInterface");
const messageRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, messageController_1.default)(messageRepoImpl_1.messageRepoImpl, messageRepoInterface_1.messageRepoInterface);
    router.post('/', controller.createNewMessage);
    router.get('/:chatId', controller.fetchMessages);
    return router;
};
exports.default = messageRouter;
