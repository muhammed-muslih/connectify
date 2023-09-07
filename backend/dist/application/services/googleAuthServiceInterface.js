"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthServiceInterface = void 0;
const googleAuthServiceInterface = (service) => {
    const verifyUser = async (token) => await service.verifyUser(token);
    return {
        verifyUser
    };
};
exports.googleAuthServiceInterface = googleAuthServiceInterface;
