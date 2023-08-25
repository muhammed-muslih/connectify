import { UserRepoInterface } from "@application/repositories/userRepoInterface";
import { AuthServicesInterface } from "@application/services/authServiceInterface";
import { HttpStatus } from "@interfaces/httpStatus";
import { S3ServiceInterface } from "@application/services/s3ServiceInterface";
import AppError from "@utils/appError";
import mongoose from "mongoose";
import { UpdateUserInterface } from "@interfaces/userInterfaces";

export const userSearch = async (
  query: string,
  userRepository: ReturnType<UserRepoInterface>
) => {
  const seacrhUsers = await userRepository.searchUser(query);
  return seacrhUsers;
};

export const findUser = async (
  id: string,
  userRepository: ReturnType<UserRepoInterface>
) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new AppError("user not found", HttpStatus.BAD_REQUEST);
  }
  return user;
};

export const followAndUnfollowUser = async (
  userId: string,
  followedUserId: string,
  userRepository: ReturnType<UserRepoInterface>
) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new AppError("user not found", HttpStatus.BAD_REQUEST);
  }
  const validFollowedUserId = new mongoose.Types.ObjectId(followedUserId);
  const isFollowed = user.followings.includes(validFollowedUserId);
  if (!isFollowed) {
    await userRepository.addUserInFollowingList(userId, followedUserId);
    await userRepository.addUserInFollowersList(userId, followedUserId);
    return {
      message: "followed successfully",
    };
  } else {
    await userRepository.removeUserFromFollowingList(userId, followedUserId);
    await userRepository.removeUserFromFollowersList(userId, followedUserId);
    return {
      message: "unfollowed successfully",
    };
  }
};

export const unFollowUser = async (
  userId: string,
  unFollowUserId: string,
  userRepository: ReturnType<UserRepoInterface>
) => {
  await userRepository.removeUserFromFollowingList(userId, unFollowUserId);
  await userRepository.removeUserFromFollowersList(userId, unFollowUserId);
  return {
    message: "unfollowed successfully",
  };
};

export const saveUnSavePosts = async (
  userId: string,
  postId: string,
  userRepository: ReturnType<UserRepoInterface>
) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new AppError("User not found", HttpStatus.BAD_REQUEST);
  }
  const validPostId = new mongoose.Types.ObjectId(postId);
  const isSaved = user.saved.includes(validPostId);
  let message;
  if (isSaved) {
    await userRepository.removeSavedPost(userId, postId);
    message = "post unsaved successfully";
  } else {
    await userRepository.SavePosts(userId, postId);
    message = "post saved successfully";
  }

  return message;
};

export const getUserSavedPosts = async (
  userId: string,
  userRepository: ReturnType<UserRepoInterface>
) => {
  const saved = await userRepository.getSavedPost(userId);
  if (!saved) {
    throw new AppError("Could not find saved post", HttpStatus.BAD_REQUEST);
  }
  return saved;
};

export const allUsers = async (
  userRepository: ReturnType<UserRepoInterface>
) => {
  const users = await userRepository.getAllUsers();
  return users;
};

export const changeUserStatus = async (
  userId: string,
  userRepository: ReturnType<UserRepoInterface>
) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new AppError("user not found", HttpStatus.BAD_REQUEST);
  }
  const status = !user.isBlocked;
  let message;
  if (status) {
    message = "user blocked successfully";
  } else {
    message = "user unblocked successfully";
  }

  await userRepository.blockAndUnblock(userId, status);
  return message;
};

export const getSavedPostDetails = async (
  userId: string,
  userRepository: ReturnType<UserRepoInterface>
) => {
  const saved = await userRepository.getSavedPostDetails(userId);
  return saved;
};

export const editUserProfile = async (
  userId: string,
  name:string,
  userName: string,
  bio: string,
  userRepository: ReturnType<UserRepoInterface>,
  s3Service: ReturnType<S3ServiceInterface>,
  file?: Express.Multer.File | undefined
) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new AppError("user not found", HttpStatus.BAD_REQUEST);
  }
  const updateFields: UpdateUserInterface = {};
  let result
  if (file) {
    const postPic = false;
    result = await s3Service.uploadAndGetUrl(file, postPic);
    updateFields.profilePicture = result.url;
    updateFields.profilePicName = result.imageName;
    if (user.profilePicture && user.profilePicName) {
      await s3Service.removeFile(user.profilePicName);
    }
  }
  const isUserNameExist = await userRepository.getUserByUserName(userName);
  if (isUserNameExist && isUserNameExist._id.toString() !== userId) {
    throw new AppError("userName already exists", HttpStatus.BAD_REQUEST);
  }
  updateFields.name = name
  updateFields.userName = userName;
  updateFields.bio = bio;
  await userRepository.editUserProfile(userId, updateFields);
  return {
    url:result?.url?result.url:user.profilePicture
  }
};

export const removeUserProfile = async(
  userId: string,
  userRepository: ReturnType<UserRepoInterface>,
  s3Service: ReturnType<S3ServiceInterface>,
) => {
  const user = await userRepository.getUserById(userId)
  if(!user){
    throw new AppError("user not found", HttpStatus.BAD_REQUEST)
  }
  const profileName= user.profilePicName
  if(profileName){
  await s3Service.removeFile(profileName)
  }
 return await userRepository.removeUserProfilePic(userId)
}

export const getFollowersAndFollowingsDetails = async(
  userId:string,
  userRepository: ReturnType<UserRepoInterface>,
)=> {
  return await userRepository.getFollowLists(userId)
}


export const verifyPassword = async(
  userId:string,
  password:string,
  userRepository:ReturnType <UserRepoInterface>,
  authServices:ReturnType <AuthServicesInterface>
) => {
  if(!userId) {
    throw new AppError('userId is not found', HttpStatus.BAD_REQUEST)
  }
  const user = await userRepository.getUserById(userId)
  if(!user){
    throw new AppError('user is not found', HttpStatus.BAD_REQUEST)
  }
  const isPasswordCorrect = await authServices.comparePassword(password,user.password as string)
  console.log(isPasswordCorrect);
  if(!isPasswordCorrect){
    throw new AppError('password is incorrect', HttpStatus.BAD_REQUEST)
  }
 return
}

export const changePassword = async(
  userId:string,
  password:string,
  userRepository:ReturnType <UserRepoInterface>,
  authServices:ReturnType <AuthServicesInterface>
  ) => {
  if(!userId) {
    throw new AppError('userId is not found', HttpStatus.BAD_REQUEST)
  }
  if(!password) {
    throw new AppError('credentials not found',HttpStatus.BAD_REQUEST)
  }
  const hasedPassword = await authServices.encryptPassword(password)
  await userRepository.changePassword(userId, hasedPassword)
  return
}

export const getUserSummary = async(
  userRepository:ReturnType <UserRepoInterface>,
) =>{
  const usersPerMonth = await userRepository.noOfUsersPerMonth()
  const usersStatus = await userRepository.getUsersStatistics()
  const usersStatistics = usersStatus[0]
  return {
    usersPerMonth,
    usersStatistics
  }
}

