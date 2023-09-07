"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("@utils/appError"));
const httpStatus_1 = require("@interfaces/httpStatus");
const authServices_1 = require("@frameworks/services/authServices");
const userAuthMid = (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        console.log('token not found');
        return next(new appError_1.default('token not found', httpStatus_1.HttpStatus.UNAUTHORIZED));
    }
    try {
        const { payload } = (0, authServices_1.authServices)().verifyToken(token);
        if (payload.role !== 'user') {
            return next(new appError_1.default("UnAuthorized User", httpStatus_1.HttpStatus.UNAUTHORIZED));
        }
        req.userId = payload.userId;
        next();
    }
    catch (error) {
        return next(new appError_1.default("UnAuthorized User", httpStatus_1.HttpStatus.UNAUTHORIZED));
    }
};
exports.default = userAuthMid;
