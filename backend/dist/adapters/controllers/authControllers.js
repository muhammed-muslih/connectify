"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("@application/useCases/auth/userAuth");
const adminAuth_1 = require("@application/useCases/auth/adminAuth");
const authController = (userDbRepoImpl, userDbRepoInt, authServiceImpl, authServiceInt, adminDbImpl, adminDbRepoInt, googleAuthServiceImpl, googleAuthServiceInt) => {
    const userRepository = userDbRepoInt(userDbRepoImpl());
    const authServices = authServiceInt(authServiceImpl());
    const adminRepository = adminDbRepoInt(adminDbImpl());
    const googleAuthService = googleAuthServiceInt(googleAuthServiceImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const result = await (0, userAuth_1.userRegister)(user, userRepository, authServices);
        res.json({
            status: "success",
            message: "new user registered",
            token: result.token,
            _id: result.userId
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userName, password } = req.body;
        const result = await (0, userAuth_1.userLogin)(userName, password, userRepository, authServices);
        res.json({
            status: "success",
            message: "user verified",
            token: result.token,
            _id: result.userId
        });
    });
    const loginAdmin = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const token = await (0, adminAuth_1.adminLogin)(email, password, adminRepository, authServices);
        res.json({
            status: "success",
            message: "admin verified",
            token
        });
    });
    const googleLogin = async (req, res) => {
        const { credential } = req.body;
        const userData = await (0, userAuth_1.loginWithGoogle)(credential, googleAuthService, userRepository, authServices);
        res.json({
            status: "success",
            message: 'user verified',
            token: userData.token,
            userName: userData.userName,
            _id: userData.userId
        });
    };
    return {
        registerUser,
        loginUser,
        loginAdmin,
        googleLogin
    };
};
exports.authController = authController;
exports.default = exports.authController;
