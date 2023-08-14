import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl";
import { UserRepoInterface } from "@application/repositories/userRepoInterface";
import asyncHandler from "express-async-handler";
import { CustomRequest } from "@interfaces/customRequestInterface";
import { Response } from "express";
import { S3ServiceImpl } from "@frameworks/services/s3BucketServie";
import {
  S3ServiceInterface,
  s3serviceInterface,
} from "@application/services/s3ServiceInterface";
import {
  userSearch,
  findUser,
  followAndUnfollowUser,
  saveUnSavePosts,
  getUserSavedPosts,
  getSavedPostDetails,
  editUserProfile,
  removeUserProfile,
  getFollowersAndFollowingsDetails
} from "@application/useCases/user/user";

export const userController = (
  userRepoImpl: UserRepoImpl,
  userRepoInterface: UserRepoInterface,
  s3ServiceImpl: S3ServiceImpl,
  s3ServiceInt: S3ServiceInterface
) => {
  const userRepository = userRepoInterface(userRepoImpl());
  const s3Service = s3serviceInterface(s3ServiceImpl());

  const searchUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { searchValue } = req.body;
    if (!searchValue) {
      res.json({
        status: "success",
        message: "no user found",
        users: [],
      });
    } else {
      const users = await userSearch(searchValue, userRepository);
      res.json({
        status: "success",
        message: "user fetched successfully",
        users,
      });
    }
  });

  const getUser = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const user = await findUser(id, userRepository);
    res.json({
      status: "success",
      message: "user found successfully",
      user,
    });
  });

  const followAndUnfollow = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.userId as string;
      const { followedUserId } = req.params;
      const result = await followAndUnfollowUser(
        userId,
        followedUserId,
        userRepository
      );
      res.json({
        status: "success",
        ...result,
      });
    }
  );

  const saveAndUnSavePosts = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.userId as string;
      const { postId } = req.body;
      const result = await saveUnSavePosts(userId, postId, userRepository);
      res.json({
        status: "success",
        message: result,
      });
    }
  );

  const getSavedPosts = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.userId as string;
      const posts = await getUserSavedPosts(userId, userRepository);
      res.json({
        status: "success",
        saved: posts.saved,
      });
    }
  );

  const savedPostDetails = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.userId as string;
      const posts = await getSavedPostDetails(userId, userRepository);
      res.json({
        status: "success",
        posts: posts?.saved,
      });
    }
  );

  const UpdateUserProfile = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.userId as string;
      const { userName, bio,name} = req.body;
      const file = req.file as Express.Multer.File;
      const result =await editUserProfile(
        userId,
        name,
        userName,
        bio,
        userRepository,
        s3Service,
        file ?? file
      );
      res.json({
        status: "success",
        message: "your profile updated successfully",
        profilePiture: result.url
      });
    }
  );

  const removeProfilePic = asyncHandler(async (req: CustomRequest, res: Response) => {
    const userId = req.userId as string
    await removeUserProfile(userId,userRepository,s3Service)
    res.json({
      status:'success',
      message:'profile pic removed successfully',
    })
  })

  const followersDetails = asyncHandler(async (req: CustomRequest, res: Response) =>{
    const userId = req.userId as string
    const result = await getFollowersAndFollowingsDetails(userId,userRepository)
    res.json({
      status:'success',
      message:'followers list fetched successfully',
      ...result,
    })

  })

  return {
    searchUser,
    getUser,
    followAndUnfollow,
    saveAndUnSavePosts,
    getSavedPosts,
    savedPostDetails,
    UpdateUserProfile,
    removeProfilePic,
    followersDetails
  };
};

export default userController;
