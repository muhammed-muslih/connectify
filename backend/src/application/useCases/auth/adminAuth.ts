import { AdminRepoInterface } from "@application/repositories/adminRepoInterface";
import { AuthServicesInterface } from "@application/services/authServiceInterface";
import { HttpStatus } from "@interfaces/httpStatus";
import AppError from "@utils/appError";

export const adminLogin = async(
    email:string,
    password:string,
    adminRepository :ReturnType<AdminRepoInterface>,
    authServices :ReturnType<AuthServicesInterface>
)=>{

    email = email.toLowerCase()
    const admin  = await adminRepository.getAdminByEmail(email)
    if(!admin){
        throw new AppError("invalid credential",HttpStatus.UNAUTHORIZED)  
    }
    const isPasswordCorrect = await authServices.comparePassword(password,admin.password)
    if(!isPasswordCorrect){
        throw new AppError("invalid credential",HttpStatus.UNAUTHORIZED)  
    }
    const token = authServices.generateToken({adminId:admin._id,role:'admin'})
    return token
}