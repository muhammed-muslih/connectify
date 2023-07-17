"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const appError_1 = __importDefault(require("@utils/appError"));
const validationMiddleware = (schema, field = 'body') => async (req, res, next) => {
    try {
        const result = schema.safeParse(req[field]);
        if (!result.success) {
            console.log(result.error.errors[0].message);
            const errorMessage = result.error.errors[0].message || "validation error";
            throw new appError_1.default(errorMessage, 400);
        }
        req.body = result.data;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validationMiddleware = validationMiddleware;
