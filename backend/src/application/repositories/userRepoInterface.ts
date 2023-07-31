import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl"
import { UserRegisterInterface } from "@interfaces/userInterfaces"

export const userRepoInterface =(repository:ReturnType<UserRepoImpl>) =>{

    const registerUser = async(user:UserRegisterInterface) => await repository.registerUser(user)

    const getUserByEmail = async (email : string) => await repository.getUserByEmail(email)

    const getUserByUserName = async (userName : string) => await repository.getUserByUserName(userName)

    const getUserById = async (id: string) => await repository.getUserById(id)

    const searchUser = async(query : string) => await repository.searchUser(query)

    const addUserInFollowingList = async(userId:string,followedUserId:string) => 
    await repository.addUserInFollowingList(userId,followedUserId)

    const addUserInFollowersList = async(userId : string,followedUserId:string) =>
    await repository.addUserInFollowersList(userId,followedUserId)

    const removeUserFromFollowingList = async(userId : string,unFollowedUserId:string) =>
    await repository.removeUserFromFollowingList(userId,unFollowedUserId)

    const removeUserFromFollowersList = async(userId : string,unFollowedUserId:string) =>
    await repository.removeUserFromFollowersList(userId,unFollowedUserId)
        


    return {
        registerUser,
        getUserByEmail,
        getUserByUserName,
        getUserById,
        searchUser,
        addUserInFollowingList,
        addUserInFollowersList,
        removeUserFromFollowingList,
        removeUserFromFollowersList
    }

}

export type UserRepoInterface = typeof userRepoInterface