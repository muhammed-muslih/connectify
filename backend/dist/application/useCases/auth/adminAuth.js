"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const httpStatus_1 = require("@interfaces/httpStatus");
const appError_1 = __importDefault(require("@utils/appError"));
const adminLogin = async (email, password, adminRepository, authServices) => {
    email = email.toLowerCase();
    const admin = await adminRepository.getAdminByEmail(email);
    if (!admin) {
        throw new appError_1.default("invalid credential", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authServices.comparePassword(password, admin.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("invalid credential", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authServices.generateToken({ adminId: admin._id, role: 'admin' });
    return token;
};
exports.adminLogin = adminLogin;
