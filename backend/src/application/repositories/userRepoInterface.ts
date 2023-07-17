import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { CreateUserInterface } from "@interfaces/userInterfaces"

export const userRepoInterface =(repository:ReturnType<UserRepoImpl>) =>{

    const registerUser = async(user:CreateUserInterface) => await repository.registerUser(user)

    const getUserByEmail = async (email : string) => await repository.getUserByEmail(email)

    const getUserByUserName = async (userName : string) => await repository.getUserByUserName(userName)


    return {
        registerUser,
        getUserByEmail,
        getUserByUserName
    }

}

export type UserRepoInterface = typeof userRepoInterface