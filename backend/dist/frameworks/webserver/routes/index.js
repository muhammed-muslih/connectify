"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const post_1 = __importDefault(require("./post"));
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
const chat_1 = __importDefault(require("./chat"));
const message_1 = __importDefault(require("./message"));
const notification_1 = __importDefault(require("./notification"));
const userAuthMid_1 = __importDefault(require("../middlewares/userAuthMid"));
const adminAuthMid_1 = __importDefault(require("../middlewares/adminAuthMid"));
const checkUserStatus_1 = __importDefault(require("../middlewares/checkUserStatus"));
const routes = (app) => {
    app.use('/api/auth', (0, auth_1.default)());
    app.use('/api/post', userAuthMid_1.default, checkUserStatus_1.default, (0, post_1.default)());
    app.use('/api/user', userAuthMid_1.default, (0, user_1.default)());
    app.use('/api/admin', adminAuthMid_1.default, (0, admin_1.default)());
    app.use('/api/chat', userAuthMid_1.default, (0, chat_1.default)());
    app.use('/api/message', userAuthMid_1.default, (0, message_1.default)());
    app.use('/api/notification', userAuthMid_1.default, (0, notification_1.default)());
};
exports.default = routes;
