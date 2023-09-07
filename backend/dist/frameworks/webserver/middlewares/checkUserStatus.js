"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/userRepoImpl");
const httpStatus_1 = require("@interfaces/httpStatus");
const appError_1 = __importDefault(require("@utils/appError"));
const checkUserStatus = async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return next(new appError_1.default("User not found", httpStatus_1.HttpStatus.BAD_REQUEST));
    }
    try {
        const user = await (0, userRepoImpl_1.userRepoImpl)().getUserById(userId);
        if (!user) {
            return next(new appError_1.default("User not found", httpStatus_1.HttpStatus.BAD_REQUEST));
        }
        if (user?.isBlocked) {
            return next(new appError_1.default("Blocked user", httpStatus_1.HttpStatus.FORBIDDEN));
        }
        next();
    }
    catch (error) {
        console.log(error);
        return next(new appError_1.default("Unauthorized User", httpStatus_1.HttpStatus.UNAUTHORIZED));
    }
};
exports.default = checkUserStatus;
