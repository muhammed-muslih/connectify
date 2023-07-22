import { UserRegisterType } from "@validation/authValidation";
import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import { AuthServicesInterface } from "@application/services/authServiceInterface"
import AppError from "@utils/appError";
import { HttpStatus } from "@interfaces/httpStatus";
import { GoogleAuthServiceInterface } from "@application/services/googleAuthServiceInterface";


export const userRegister = async (
    user: UserRegisterType,
    userRepository:ReturnType <UserRepoInterface>,
    authServices:ReturnType <AuthServicesInterface>
)=> {
    user.email = user.email.toLowerCase();
    user.userName = user.userName.toLowerCase();
    const isUserNameExist = await userRepository.getUserByUserName(user.userName)
    if(isUserNameExist){
        throw new AppError('userName already used',HttpStatus.UNAUTHORIZED);
    }
    const isUserEmailExist = await userRepository.getUserByEmail(user.email)
    if(isUserEmailExist){
        throw new AppError('existing email', HttpStatus.UNAUTHORIZED)
    }
    user.password = await authServices.encryptPassword(user.password)
    const {_id:userId} = await userRepository.registerUser(user)
    const token = authServices.generateToken(userId.toString())
    return token
}

export const userLogin = async(
    userName : string,
    password : string,
    userRepository :ReturnType <UserRepoInterface>,
    authServices:ReturnType <AuthServicesInterface>
) =>{
    userName = userName.toLowerCase()
    const user = await userRepository.getUserByUserName(userName)
    if(!user){
        throw new AppError('user not found',HttpStatus.UNAUTHORIZED)
    }
    const isPasswordCorrect = await authServices.comparePassword(password,user.password)
    if(!isPasswordCorrect){
        throw new AppError('Sorry, your password was incorrect. Please double-check your password',HttpStatus.UNAUTHORIZED)
    }
    const token = authServices.generateToken(user._id)
    return token
}


export const loginWithGoogle = async(
    credential : string,
    googleAuthService : ReturnType <GoogleAuthServiceInterface>,
    userRepository : ReturnType <UserRepoInterface>,
    authServices : ReturnType <AuthServicesInterface>
) => {
    const user = await googleAuthService.verifyUser(credential.toString())
    const isUserExist = await userRepository.getUserByEmail(user.email)
    if(isUserExist) {
        const token = authServices.generateToken(isUserExist._id)
        return {
            token,
            userName:isUserExist.userName
        }
    }else{
        const {_id:userId} = await userRepository.registerUser(user)
        const token = authServices.generateToken(userId.toString()) 
        return {
            token,
            userName:user.userName
        }
    }
}