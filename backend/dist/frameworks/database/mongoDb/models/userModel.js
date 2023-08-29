"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "please add name"],
    },
    userName: {
        type: String,
        required: [true, "please add userName"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "please add email"],
        unique: true
    },
    password: {
        type: String,
    },
    isGoogleUser: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    profilePicName: {
        type: String,
    },
    bio: {
        type: String
    },
    followers: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    followings: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    saved: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Posts',
        default: []
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    verified: {
        isVerified: { type: Boolean, default: false },
        subscribe: { type: String, default: '' },
        startDate: { type: Date },
        endDate: { type: Date },
        planDuration: { type: String }
    }
}, {
    timestamps: true
});
const User = (0, mongoose_1.model)('User', userSchema, 'users');
exports.default = User;
