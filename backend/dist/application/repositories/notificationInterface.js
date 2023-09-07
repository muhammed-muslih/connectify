"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationrRepoInterface = void 0;
const notificationrRepoInterface = (repository) => {
    const getNotifications = async (userId) => await repository.getNotifications(userId);
    const markAsRead = async (userId) => await repository.markAsRead(userId);
    return {
        getNotifications,
        markAsRead
    };
};
exports.notificationrRepoInterface = notificationrRepoInterface;
