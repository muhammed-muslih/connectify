import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { UserRegisterType } from "@validation/authValidation"

export const userRepoInterface =(repository:ReturnType<UserRepoImpl>) =>{

    const registerUser = async(user:UserRegisterType) => await repository.registerUser(user)

    const getUserByEmail = async (email : string) => await repository.getUserByEmail(email)

    const getUserByUserName = async (userName : string) => await repository.getUserByUserName(userName)


    return {
        registerUser,
        getUserByEmail,
        getUserByUserName
    }

}

export type UserRepoInterface = typeof userRepoInterface