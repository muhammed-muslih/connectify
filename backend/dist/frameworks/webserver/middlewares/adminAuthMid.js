"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("@utils/appError"));
const httpStatus_1 = require("@interfaces/httpStatus");
const authServices_1 = require("@frameworks/services/authServices");
const adminAuthMid = (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new appError_1.default('Token Not Found', httpStatus_1.HttpStatus.UNAUTHORIZED));
    }
    try {
        const { payload } = (0, authServices_1.authServices)().verifyToken(token);
        if (payload.role !== 'admin') {
            return next(new appError_1.default("UnAuthorized Admin", httpStatus_1.HttpStatus.UNAUTHORIZED));
        }
        next();
    }
    catch (error) {
        return next(new appError_1.default("UnAuthorized Admin", httpStatus_1.HttpStatus.UNAUTHORIZED));
    }
};
exports.default = adminAuthMid;
