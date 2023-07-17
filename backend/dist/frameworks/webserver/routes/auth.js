"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("@adapters/controllers/authControllers"));
const userRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/userRepoImpl");
const userRepoInterface_1 = require("@application/repositories/userRepoInterface");
const authServices_1 = require("@frameworks/services/authServices");
const authServiceInterface_1 = require("@application/services/authServiceInterface");
const adminRepoInterface_1 = require("@application/repositories/adminRepoInterface");
const adminRepoImpl_1 = require("@frameworks/database/mongoDb/repositories/adminRepoImpl");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const authValidation_1 = require("@validation/authValidation");
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authControllers_1.default)(userRepoImpl_1.userRepoImpl, userRepoInterface_1.userRepoInterface, authServices_1.authServices, authServiceInterface_1.authServiceInterface, adminRepoImpl_1.adminRepoImpl, adminRepoInterface_1.adminRepoInterface);
    router.post('/register', (0, validationMiddleware_1.validationMiddleware)(authValidation_1.userRegisterSchema), controller.registerUser);
    router.post('/user-login', (0, validationMiddleware_1.validationMiddleware)(authValidation_1.userLoginSchema), controller.loginUser);
    router.post('/admin-login', (0, validationMiddleware_1.validationMiddleware)(authValidation_1.adminLoginSchema), controller.loginAdmin);
    return router;
};
exports.default = authRouter;
