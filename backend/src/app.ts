import 'module-alias/register'
import express,{Application, NextFunction} from 'express'
import colors = require('colors.ts')
colors.enable()
import expressConfig from '@frameworks/webserver/express'
import serverConfig from '@frameworks/webserver/server'
import connectDB from '@frameworks/database/mongoDb/connection'
import errorHandler from '@frameworks/webserver/middlewares/errorHandling'
import AppError from '@utils/appError'
import routes from '@frameworks/webserver/routes'


const app :Application = express()

//database connection
connectDB()

//express configuration
expressConfig(app)


//error handling middleware
app.use(errorHandler)

//routes setup
routes(app)

// catch not founded routes and forwards to error handler (404)
app.all('*',(req,res,next : NextFunction)=>{
    next(new AppError('Not found!',404))
})

//server configuration
serverConfig(app).startServer()


