"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const encryptPassword = async (password) => await service.encryptPassword(password);
    const comparePassword = (password, hashedpassword) => service.comparePassword(password, hashedpassword);
    const generateToken = (payload) => service.generateToken(payload);
    const verifyToken = (token) => service.verifyToken(token);
    const generateRandomNumber = () => service.generateRandomNumber();
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
        generateRandomNumber
    };
};
exports.authServiceInterface = authServiceInterface;
