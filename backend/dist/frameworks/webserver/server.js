"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const serverConfig = (server) => {
    const startServer = () => {
        server.listen(config_1.default.PORT, () => {
            console.log(`server listening on ${config_1.default.PORT}`.color_bg_at_256(15).bold);
        });
    };
    return {
        startServer,
    };
};
exports.default = serverConfig;
