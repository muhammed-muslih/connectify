import { AdminRepoMongoDB } from "@frameworks/database/mongoDb/repositories/adminRepoMongoDB"


export const adminRepoInterface = (repository : ReturnType <AdminRepoMongoDB>)=>{

    const getAdminByEmail = async(email : string) => await repository.getAdminByEmail(email)

    return {
        getAdminByEmail
    }

}

export type AdminRepoInterface = typeof adminRepoInterface