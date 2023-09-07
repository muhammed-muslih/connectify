"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRepoImpl = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const notificationRepoImpl = () => {
    const getNotifications = async (userId) => {
        return await notificationModel_1.default.find({ receiver: userId })
            .sort({ createdAt: -1 })
            .populate({ path: "user", select: "userName profilePicture" })
            .populate({ path: "postId", select: "imageUrl" });
    };
    const markAsRead = async (userId) => {
        await notificationModel_1.default.updateMany({ receiver: userId }, { $set: { isRead: true } });
    };
    return {
        getNotifications,
        markAsRead
    };
};
exports.notificationRepoImpl = notificationRepoImpl;
