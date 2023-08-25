import { UserRepoImpl } from "@frameworks/database/mongoDb/repositories/userRepoImpl";
import { UserRepoInterface } from "@application/repositories/userRepoInterface";
import asyncHandler from "express-async-handler";
import { allUsers, changeUserStatus,getUserSummary } from "@application/useCases/user/user";
import { Request, Response } from "express";
import { PostRepoImp } from "@frameworks/database/mongoDb/repositories/postRepoImpl";
import { PostRepoInterface } from "@application/repositories/postRepoInterface";
import { getPosts, deletePost,getPostStatistics } from "@application/useCases/post/posts";
import { S3ServiceImpl } from "@frameworks/services/s3BucketServie";
import { S3ServiceInterface } from "@application/services/s3ServiceInterface";


export const adminController = (
  userRepoImpl: UserRepoImpl,
  userRepoInterface: UserRepoInterface,
  postRepoImpl: PostRepoImp,
  postRepoInterface: PostRepoInterface,
  s3ServiceImpl: S3ServiceImpl,
  s3ServiceInterface: S3ServiceInterface
) => {
  const userRepository = userRepoInterface(userRepoImpl());
  const postRepository = postRepoInterface(postRepoImpl());
  const s3Service = s3ServiceInterface(s3ServiceImpl());

  const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await allUsers(userRepository);
    res.json({
      status: "success",
      users,
    });
  });

  const blockAndUnBlockUser = asyncHandler(
    async (req: Request, res: Response) => {
      const { userId } = req.body;
      const result = await changeUserStatus(userId, userRepository);
      res.json({
        status: "success",
        message: result,
      });
    }
  );

  const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await getPosts(postRepository);
    res.json({
      status: "success",
      message: "posts fetched successfully",
      posts,
    });
  });

  const removePost = asyncHandler(async (req: Request, res: Response) => {
    const { userId, postId } = req.body;
    await deletePost(userId, postId, postRepository, s3Service);
    res.json({
      status: "success",
      message: "post deleted successfully",
    });
  });

  const getDashBoardDatasForUsers = asyncHandler(async (req: Request, res: Response) =>{
    const users = await getUserSummary(userRepository)
    res.json({
      status:'success',
      message:'data fetched successfully',
      ...users
    })

  })

  const getDashBoardDatasForPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await getPostStatistics(postRepository)
    res.json({
      status:'success',
      message:'data fetched successfully',
      posts
    })

  })

  return {
    getAllUsers,
    blockAndUnBlockUser,
    getAllPosts,
    removePost,
    getDashBoardDatasForUsers,
    getDashBoardDatasForPosts
  };
};
