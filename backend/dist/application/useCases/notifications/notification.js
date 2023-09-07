"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAsRead = exports.findNotifications = void 0;
const appError_1 = __importDefault(require("@utils/appError"));
const httpStatus_1 = require("@interfaces/httpStatus");
const findNotifications = async (userId, notificationRepo) => {
    if (!userId)
        throw new appError_1.default('user not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    return await notificationRepo.getNotifications(userId);
};
exports.findNotifications = findNotifications;
const setAsRead = async (userId, notificationRepo) => {
    if (!userId)
        throw new appError_1.default('user not found', httpStatus_1.HttpStatus.BAD_REQUEST);
    return await notificationRepo.markAsRead(userId);
};
exports.setAsRead = setAsRead;
