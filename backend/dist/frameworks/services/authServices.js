"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const authServices = () => {
    const encryptPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        password = await bcryptjs_1.default.hash(password, salt);
        return password;
    };
    const comparePassword = (password, hashedPassword) => {
        return bcryptjs_1.default.compare(password, hashedPassword);
    };
    const generateToken = (payload) => {
        const token = jsonwebtoken_1.default.sign({ payload }, config_1.default.JWT_SECRET, {
            expiresIn: '3d'
        });
        return token;
    };
    const verifyToken = (token) => {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    };
    const generateRandomNumber = () => {
        // Generate a random number between 0 and 9999
        const randomNumber = Math.floor(Math.random() * 10000);
        return randomNumber;
    };
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
        generateRandomNumber
    };
};
exports.authServices = authServices;
