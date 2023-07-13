"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("@adapters/controllers/authControllers"));
const userRepoMongoDB_1 = require("@frameworks/database/mongoDb/repositories/userRepoMongoDB");
const userRepoInterface_1 = require("@application/repositories/userRepoInterface");
const authServices_1 = require("@frameworks/services/authServices");
const authServiceInterface_1 = require("@application/services/authServiceInterface");
const adminRepoInterface_1 = require("@application/repositories/adminRepoInterface");
const adminRepoMongoDB_1 = require("@frameworks/database/mongoDb/repositories/adminRepoMongoDB");
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authControllers_1.default)(userRepoMongoDB_1.userRepoMongoDB, userRepoInterface_1.userRepoInterface, authServices_1.authServices, authServiceInterface_1.authServiceInterface, adminRepoMongoDB_1.adminRepoMongoDB, adminRepoInterface_1.adminRepoInterface);
    router.post('/register', controller.registerUser);
    router.post('/user-login', controller.loginUser);
    router.post('/admin-login', controller.loginAdmin);
    return router;
};
exports.default = authRouter;
