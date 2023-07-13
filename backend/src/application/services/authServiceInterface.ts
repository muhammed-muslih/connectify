import { AuthServices } from "@frameworks/services/authServices"

export const authServiceInterface = (service:ReturnType <AuthServices>) => {

    const encryptPassword = async (password:string) => await service.encryptPassword(password)

    const comparePassword = (password:string,hashedpassword : string) => service.comparePassword(password,hashedpassword)

    const generateToken = (payload:string) => service.generateToken(payload)

    const verifyToken = (token : string) => service.verifyToken(token)

    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken
    }

}

export type AuthServicesInterface = typeof authServiceInterface