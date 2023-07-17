import Admin from "../models/adminModel";
import { AdminInterface } from "@interfaces/adminInterface";

export const adminRepoImpl = ()=>{
    
    const getAdminByEmail = async(email : string) =>{
        const admin : AdminInterface | null = await Admin.findOne({email})
        return  admin
    }

    return {
        getAdminByEmail
    }
}

export  type AdminRepoImpl = typeof adminRepoImpl