import 'module-alias/register'
import express,{Application, NextFunction} from 'express'
import colors = require('colors.ts')
colors.enable()
import http from 'http'
import expressConfig from '@frameworks/webserver/express'
import serverConfig from '@frameworks/webserver/server'
import connectDB from '@frameworks/database/mongoDb/connection'
import errorHandler from '@frameworks/webserver/middlewares/errorHandling'
import AppError from '@utils/appError'
import routes from '@frameworks/webserver/routes'
import {Server} from 'socket.io'
import socketConfig from '@frameworks/webSocket/socket'



const app :Application = express()
const server = http.createServer(app);

const io = new Server(server,{
    pingTimeout:60000,
    cors: {
        origin: ["https://connectif.online","https://www.connectif.online"],
        methods: ["GET", "POST"]
    }
})
socketConfig(io)


//database connection
connectDB()

//express configuration
expressConfig(app)

//routes setup
routes(app)

//error handling middleware
app.use(errorHandler)


// catch not founded routes and forwards to error handler (404)
app.all('*',(req,res,next : NextFunction)=>{
    next(new AppError('Not found!',404))
})

//server configuration
serverConfig(server).startServer()


