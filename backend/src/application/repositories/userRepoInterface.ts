import { UserRepoMongoDB } from "@frameworks/database/mongoDb/repositories/userRepoMongoDB"
import { CreateUserInterface } from "@interfaces/userInterfaces"

export const userRepoInterface =(repository:ReturnType<UserRepoMongoDB>) =>{

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