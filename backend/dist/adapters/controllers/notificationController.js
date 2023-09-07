"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notification_1 = require("@application/useCases/notifications/notification");
const notificationController = (notificationRepoImpl, notificcationRepoInterface) => {
    const notificationRepo = notificcationRepoInterface(notificationRepoImpl());
    const getNotifications = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        const notifications = await (0, notification_1.findNotifications)(userId, notificationRepo);
        res.json({
            status: 'success',
            message: 'notification fected successfully',
            notifications
        });
    });
    const markAsRead = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.userId;
        await (0, notification_1.setAsRead)(userId, notificationRepo);
        res.json({
            status: 'success',
            message: 'notifications are read successfully',
        });
    });
    return {
        getNotifications,
        markAsRead
    };
};
exports.default = notificationController;
