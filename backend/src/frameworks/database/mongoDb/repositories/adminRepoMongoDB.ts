import Admin from "../models/adminModel";
import { AdminInterface } from "@interfaces/adminInterface";

export const adminRepoMongoDB = ()=>{
    
    const getAdminByEmail = async(email : string) =>{
        const admin : AdminInterface | null = await Admin.findOne({email})
        return  admin
    }

    return {
        getAdminByEmail
    }
}

export  type AdminRepoMongoDB = typeof adminRepoMongoDB 