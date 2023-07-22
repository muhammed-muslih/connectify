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
}, {
    // automatically includes  created and updated time fields
    timestamps: true
});
const User = (0, mongoose_1.model)('User', userSchema, 'users');
exports.default = User;
