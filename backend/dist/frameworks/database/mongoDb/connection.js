"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
mongoose_1.default.set('strictQuery', true);
const connectDB = async () => {
    try {
        const { connection } = await mongoose_1.default.connect(config_1.default.MONGO_DB_URL);
        console.log(`database connected successfully  : ${connection.host}`.color_bg_at_256(80).bold);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.default = connectDB;
