import { AuthServices } from "@frameworks/services/authServices"
import { TokenGenerateInt } from "@interfaces/tokenInterface"

export const authServiceInterface = (service:ReturnType <AuthServices>) => {

    const encryptPassword = async (password:string) => await service.encryptPassword(password)

    const comparePassword = (password:string,hashedpassword : string) => service.comparePassword(password,hashedpassword)

    const generateToken = (payload:TokenGenerateInt) => service.generateToken(payload)

    const verifyToken = (token : string) => service.verifyToken(token)

    const generateRandomNumber = () =>service.generateRandomNumber()

    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
        generateRandomNumber
    }

}

export type AuthServicesInterface = typeof authServiceInterface