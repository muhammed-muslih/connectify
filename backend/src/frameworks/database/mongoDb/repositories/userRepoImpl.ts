import User from "../models/userModel";
import {UserInterface } from "@interfaces/userInterfaces";
import { UserRegisterInterface } from "@interfaces/userInterfaces";

export const userRepoImpl = () =>{

    const registerUser = async(user:UserRegisterInterface) => await User.create(user)

    const getUserByEmail = async(email : string) => {
      const user : UserInterface |null =   await User.findOne({email})
      return user
    }

    const getUserByUserName = async(userName : string) => {
        const user : UserInterface |null = await User.findOne({userName})
        return user
    }

    const getUserById = async(id : string) => await User.findById(id)

    const searchUser = async(query:string) => {
        const regexPattern = new RegExp(`^${query}`, 'i');
        return  await User.find({ userName: regexPattern });
    }

    const addUserInFollowingList = async(userId:string,followedUserId : string)  => {
       return await User.findByIdAndUpdate(userId,{$addToSet:{followings:followedUserId}})
    }

    const addUserInFollowersList = async(userId:string,followedUserId : string) => {
      return  await User.findByIdAndUpdate(followedUserId,{$addToSet:{followers:userId}})
    }
    
    const removeUserFromFollowingList = async(userId:string,unFollowedUserId : string) => {
        return await User.findByIdAndUpdate(userId,{$pull:{followings:unFollowedUserId}})
    }

    const removeUserFromFollowersList = async(userId:string,unFollowedUserId : string) => {
        return await User.findByIdAndUpdate(unFollowedUserId,{$pull:{followers:userId}})
    }
    

    return{
        registerUser,
        getUserByEmail,     
        getUserByUserName ,
        getUserById,
        searchUser,
        addUserInFollowersList,
        addUserInFollowingList,
        removeUserFromFollowersList,
        removeUserFromFollowingList
    }
}

export type UserRepoImpl  = typeof userRepoImpl

