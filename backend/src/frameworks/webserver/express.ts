import express ,{Application} from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import expressMongoSanitize from 'express-mongo-sanitize'


const expressConfig = (app : Application) =>{

    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cors())
    app.use(helmet({xssFilter:true}))
    app.use(expressMongoSanitize())

}

export default expressConfig