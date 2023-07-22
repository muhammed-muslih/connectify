"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const colors = require("colors.ts");
colors.enable();
const express_2 = __importDefault(require("@frameworks/webserver/express"));
const server_1 = __importDefault(require("@frameworks/webserver/server"));
const connection_1 = __importDefault(require("@frameworks/database/mongoDb/connection"));
const errorHandling_1 = __importDefault(require("@frameworks/webserver/middlewares/errorHandling"));
const appError_1 = __importDefault(require("@utils/appError"));
const routes_1 = __importDefault(require("@frameworks/webserver/routes"));
const app = (0, express_1.default)();
//database connection
(0, connection_1.default)();
//express configuration
(0, express_2.default)(app);
//error handling middleware
app.use(errorHandling_1.default);
//routes setup
(0, routes_1.default)(app);
// catch not founded routes and forwards to error handler (404)
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found!', 404));
});
//server configuration
(0, server_1.default)(app).startServer();
