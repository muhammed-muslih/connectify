"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepoMongoDB = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const adminRepoMongoDB = () => {
    const getAdminByEmail = async (email) => {
        const admin = await adminModel_1.default.findOne({ email });
        return admin;
    };
    return {
        getAdminByEmail
    };
};
exports.adminRepoMongoDB = adminRepoMongoDB;
