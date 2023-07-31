import dotenv from 'dotenv'
dotenv.config()

const configKeys = {

    PORT : process.env.PORT,

    MONGO_DB_URL : process.env.MONGO_DB_URL as string,

    JWT_SECRET : process.env.JWT_SECRET as string,

    GOOGLE_AUTH_CLIENT_ID : process.env.GOOGLE_AUTH_CLIENT_ID as string,

    S3_ACCESS_KEY : process.env.S3_ACCESS_KEY as string,

    S3_SECRET_ACCESS_KEY : process.env.S3_SECRET_ACCESS_KEY as string,

    S3_BUCKET_NAME : process.env.S3_BUCKET_NAME as string,

    S3_BUCKET_REGION : process.env.S3_BUCKET_REGION as string


}

export default configKeys