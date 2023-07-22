"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithGoogle = exports.userLogin = exports.userRegister = void 0;
const appError_1 = __importDefault(require("@utils/appError"));
const httpStatus_1 = require("@interfaces/httpStatus");
const userRegister = async (user, userRepository, authServices) => {
    user.email = user.email.toLowerCase();
    user.userName = user.userName.toLowerCase();
    const isUserNameExist = await userRepository.getUserByUserName(user.userName);
    if (isUserNameExist) {
        throw new appError_1.default('userName already used', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isUserEmailExist = await userRepository.getUserByEmail(user.email);
    if (isUserEmailExist) {
        throw new appError_1.default('existing email', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    user.password = await authServices.encryptPassword(user.password);
    const { _id: userId } = await userRepository.registerUser(user);
    const token = authServices.generateToken(userId.toString());
    return token;
};
exports.userRegister = userRegister;
const userLogin = async (userName, password, userRepository, authServices) => {
    userName = userName.toLowerCase();
    const user = await userRepository.getUserByUserName(userName);
    if (!user) {
        throw new appError_1.default('user not found', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authServices.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry, your password was incorrect. Please double-check your password', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authServices.generateToken(user._id);
    return token;
};
exports.userLogin = userLogin;
const loginWithGoogle = async (credential, googleAuthService, userRepository, authServices) => {
    const user = await googleAuthService.verifyUser(credential.toString());
    const isUserExist = await userRepository.getUserByEmail(user.email);
    if (isUserExist) {
        const token = authServices.generateToken(isUserExist._id);
        return {
            token,
            userName: isUserExist.userName
        };
    }
    else {
        const { _id: userId } = await userRepository.registerUser(user);
        const token = authServices.generateToken(userId.toString());
        return {
            token,
            userName: user.userName
        };
    }
};
exports.loginWithGoogle = loginWithGoogle;
