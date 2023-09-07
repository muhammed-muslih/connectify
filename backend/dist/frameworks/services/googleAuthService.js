"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(config_1.default.GOOGLE_AUTH_CLIENT_ID);
const googleAuthService = () => {
    const verifyUser = async (token) => {
        const user = {
            name: "",
            userName: "",
            email: "",
            isGoogleUser: true
        };
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config_1.default.GOOGLE_AUTH_CLIENT_ID
            });
            const payload = ticket.getPayload();
            user.name = payload?.name ?? "";
            user.userName = payload?.given_name ?? "";
            user.email = payload?.email ?? "";
        }
        catch (error) {
            console.log(error);
        }
        return user;
    };
    return {
        verifyUser
    };
};
exports.googleAuthService = googleAuthService;
