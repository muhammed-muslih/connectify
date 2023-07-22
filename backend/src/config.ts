import dotenv from 'dotenv'
dotenv.config()

const configKeys = {

    PORT : process.env.PORT,

    MONGO_DB_URL : process.env.MONGO_DB_URL as string,

    JWT_SECRET : process.env.JWT_SECRET as string,

    GOOGLE_AUTH_CLIENT_ID : process.env.GOOGLE_AUTH_CLIENT_ID as string,
}

export default configKeys