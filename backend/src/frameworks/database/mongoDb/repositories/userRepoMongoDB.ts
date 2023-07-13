import User from "../models/userModel";
import { CreateUserInterface,UserInterface } from "@interfaces/userInterfaces";

export const userRepoMongoDB = () =>{

    const registerUser = async(user:CreateUserInterface) => await User.create(user)

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

export type UserRepoMongoDB  = typeof userRepoMongoDB

