"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = __importDefault(require("@adapters/controllers/notificationController"));
const notificationRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/notificationRepoImpl");
const notificationInterface_1 = require("@application/repositories/notificationInterface");
const notificationRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, notificationController_1.default)(notificationRepoImpl_1.notificationRepoImpl, notificationInterface_1.notificationrRepoInterface);
    router.get('/', controller.getNotifications);
    router.post('/mark-as-read', controller.markAsRead);
    return router;
};
exports.default = notificationRouter;
