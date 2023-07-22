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

    return{
        registerUser,
        getUserByEmail,
        getUserByUserName
    }
}

export type UserRepoImpl  = typeof userRepoImpl

