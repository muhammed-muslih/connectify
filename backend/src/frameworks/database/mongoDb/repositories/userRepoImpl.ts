import User from "../models/userModel";
import {UserInterface } from "@interfaces/userInterfaces";
import { UserRegisterInterface ,UpdateUserInterface} from "@interfaces/userInterfaces";

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
        const regexPattern = new RegExp(`${query}`, 'i');
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

    const SavePosts = async (userId:string,postId:string) => {
        await User.findByIdAndUpdate(userId,{$addToSet:{saved:postId}})
    }

    const removeSavedPost = async(userId:string,postId:string) => {
        await User.findByIdAndUpdate(userId,{$pull:{saved:postId}})
    }
    
    const getSavedPost = async(userId:string) => await User.findOne({_id:userId}).select('saved')

    const getSavedPostDetails = async(userId:string) => await User.findOne({_id:userId})
    .populate({path:'saved'}).select('saved')

    const getAllUsers = async() => await User.find({}).sort({createdAt:-1})

    const blockAndUnblock = async(userId : string,status:boolean) =>
    await User.findByIdAndUpdate(userId,{isBlocked:status})

    const editUserProfile = async(userId:string,updateFields:UpdateUserInterface) => {
       return await User.findByIdAndUpdate(
            userId,
            {$set:updateFields}
        )
    }

    const removeUserProfilePic = async(userId:string) => 
    await User.findByIdAndUpdate(userId,{$set:{profilePicture:'',profilePicName:''}})

    const getFollowLists = async (userId : string) => {
        const user =await User.findById(userId).populate({
            path:'followers',
            select:'userName profilePicture'
        })
        .populate({
            path:'followings',
            select:'userName profilePicture'
        })

        return {
            followers:user?.followers,
            followings:user?.followings
        }
        
    }

    const changePassword = async (userId : string,password:string) =>
     await User.findByIdAndUpdate(userId,{$set:{password:password}})

    return{
        registerUser,
        getUserByEmail,     
        getUserByUserName ,
        getUserById,
        searchUser,
        addUserInFollowersList,
        addUserInFollowingList,
        removeUserFromFollowersList,
        removeUserFromFollowingList,
        SavePosts,
        removeSavedPost,
        getSavedPost,
        getAllUsers,
        blockAndUnblock,
        getSavedPostDetails,
        editUserProfile,
        removeUserProfilePic,
        getFollowLists,
        changePassword
    }
}

export type UserRepoImpl  = typeof userRepoImpl

