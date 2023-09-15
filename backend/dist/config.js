"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const configKeys = {
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION
};
exports.default = configKeys;
