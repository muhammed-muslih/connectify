import { AdminRepoImpl } from "@frameworks/database/mongoDb/repositories/adminRepoImpl"


export const adminRepoInterface = (repository : ReturnType <AdminRepoImpl>)=>{

    const getAdminByEmail = async(email : string) => await repository.getAdminByEmail(email)

    return {
        getAdminByEmail
    }

}

export type AdminRepoInterface = typeof adminRepoInterface