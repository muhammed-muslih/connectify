"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String, trim: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Posts'
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});
const Notification = (0, mongoose_1.model)('Notification', notificationSchema, 'notification');
exports.default = Notification;
