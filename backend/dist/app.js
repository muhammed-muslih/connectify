"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const colors = require("colors.ts");
colors.enable();
const http_1 = __importDefault(require("http"));
const express_2 = __importDefault(require("@frameworks/webserver/express"));
const server_1 = __importDefault(require("@frameworks/webserver/server"));
const connection_1 = __importDefault(require("@frameworks/database/mongoDb/connection"));
const errorHandling_1 = __importDefault(require("@frameworks/webserver/middlewares/errorHandling"));
const appError_1 = __importDefault(require("@utils/appError"));
const routes_1 = __importDefault(require("@frameworks/webserver/routes"));
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("@frameworks/webSocket/socket"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
(0, socket_1.default)(io);
//database connection
(0, connection_1.default)();
//express configuration
(0, express_2.default)(app);
//routes setup
(0, routes_1.default)(app);
//error handling middleware
app.use(errorHandling_1.default);
// catch not founded routes and forwards to error handler (404)
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found!', 404));
});
//server configuration
(0, server_1.default)(server).startServer();
