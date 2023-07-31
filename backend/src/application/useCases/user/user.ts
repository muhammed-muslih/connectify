import { UserRepoInterface } from "@application/repositories/userRepoInterface"
import { HttpStatus } from "@interfaces/httpStatus";
import AppError from "@utils/appError";
import mongoose from "mongoose";



export const userSearch = async(
    query: string,
    userRepository : ReturnType<UserRepoInterface>
) => {

    const seacrhUsers = await userRepository.searchUser(query);
    return seacrhUsers
}

export const findUser = async(id : string,userRepository : ReturnType<UserRepoInterface>) =>{
    const user = await userRepository.getUserById(id); 
    if(!user){
     throw new AppError('user not found',HttpStatus.BAD_REQUEST)

    }
    return user

}

export const followAndUnfollowUser = async(
    userId : string,
    followedUserId : string,
    userRepository : ReturnType<UserRepoInterface>
    ) =>{
       const user = await userRepository.getUserById(userId)
       if(!user){
        throw new AppError('user not found',HttpStatus.BAD_REQUEST)
       }
        const validFollowedUserId = new mongoose.Types.ObjectId(followedUserId)
        const isFollowed = user.followings.includes(validFollowedUserId)
        if(!isFollowed){
            await userRepository.addUserInFollowingList(userId,followedUserId)
            await userRepository.addUserInFollowersList(userId,followedUserId)
            return {
                message:'followed successfully'
            }
        }else {
            await userRepository.removeUserFromFollowingList(userId,followedUserId)
            await userRepository.removeUserFromFollowersList(userId,followedUserId)
           return {
           message : 'unfollowed successfully'
          }

        }
}

export const unFollowUser = async(
    userId: string,
    unFollowUserId: string,
    userRepository : ReturnType<UserRepoInterface>
) => {
    await userRepository.removeUserFromFollowingList(userId,unFollowUserId)
    await userRepository.removeUserFromFollowersList(userId,unFollowUserId)
    return {
        message : 'unfollowed successfully'
    }
}