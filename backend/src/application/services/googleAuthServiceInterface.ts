import { GoogleAuthService} from "@frameworks/services/googleAuthService"


export const  googleAuthServiceInterface = (service:ReturnType <GoogleAuthService>) =>{
    const verifyUser = async(token : string) => await service.verifyUser(token)

    return {
        verifyUser
    }


}

export type GoogleAuthServiceInterface = typeof googleAuthServiceInterface