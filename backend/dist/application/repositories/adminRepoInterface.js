"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepoInterface = void 0;
const adminRepoInterface = (repository) => {
    const getAdminByEmail = async (email) => await repository.getAdminByEmail(email);
    return {
        getAdminByEmail
    };
};
exports.adminRepoInterface = adminRepoInterface;
