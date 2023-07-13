"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("@application/useCases/auth/userAuth");
const adminAuth_1 = require("@application/useCases/auth/adminAuth");
const authController = (userDbRepoImpl, userDbRepo, authServiceImpl, authService, adminDbImpl, adminDbRepo) => {
    const dbRepositoryUser = userDbRepo(userDbRepoImpl());
    const authServices = authService(authServiceImpl());
    const dbRepositoryAdmin = adminDbRepo(adminDbImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const token = await (0, userAuth_1.userRegister)(user, dbRepositoryUser, authServices);
        res.json({
            status: "success",
            message: "new user registered",
            token
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userName, password } = req.body;
        const token = await (0, userAuth_1.userLogin)(userName, password, dbRepositoryUser, authServices);
        res.json({
            status: "success",
            message: "user verified",
            token
        });
    });
    const loginAdmin = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const token = await (0, adminAuth_1.adminLogin)(email, password, dbRepositoryAdmin, authServices);
        res.json({
            status: "success",
            message: "admin verified",
            token
        });
    });
    return {
        registerUser,
        loginUser,
        loginAdmin
    };
};
exports.authController = authController;
exports.default = exports.authController;
