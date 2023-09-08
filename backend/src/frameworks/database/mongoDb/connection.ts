import mongoose from "mongoose";
import configKeys from "../../../config";



const connectDB = async ()=>{
    console.log(configKeys.MONGO_DB_URL,process.env.MONGO_DB_URL);
    
    try {
        const {connection} = await mongoose.connect(configKeys.MONGO_DB_URL as string)
        console.log(`database connected successfully  : ${connection.host}`.color_bg_at_256(80).bold);
    } catch (error) {
        
        console.log(error);
        process.exit(1);
    }
}

export default connectDB