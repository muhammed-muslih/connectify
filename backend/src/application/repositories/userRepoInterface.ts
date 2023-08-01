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

    const SavePosts = async(userId : string,postId : string) => await repository.SavePosts(userId,postId)

    const removeSavedPost =  async(userId:string,postId:string) => await repository.removeSavedPost(userId,postId)

    const getSavedPost = async(userId:string) => await repository.getSavedPost(userId)

    const getAllUsers = async() => await repository.getAllUsers()

    const blockAndUnblock = async(userId:string,status:boolean) => await repository.blockAndUnblock(userId,status)
        
    return {
        registerUser,
        getUserByEmail,
        getUserByUserName,
        getUserById,
        searchUser,
        addUserInFollowingList,
        addUserInFollowersList,
        removeUserFromFollowingList,
        removeUserFromFollowersList,
        SavePosts,
        removeSavedPost,
        getSavedPost,
        getAllUsers,
        blockAndUnblock
    }

}

export type UserRepoInterface = typeof userRepoInterface