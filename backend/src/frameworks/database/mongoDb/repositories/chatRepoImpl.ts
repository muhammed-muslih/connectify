import Chat from "../models/chatModel";

export const chatRepoImpl = () => {
  const isChatExist = async (currentUserId: string, userId: string) => {
    return await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq: currentUserId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate({ path: "users", select: "userName profilePicture" })
      .populate("latestMessage");
  };

  const createChat = async (currentUserId: string, userId: string) => {
    const users = [currentUserId, userId];
    return await Chat.create({ users });
  };

  const getSingleChatById = async (chatId: string) => {
    return await Chat.findById(chatId)
      .populate({ path: "users", select: "userName profilePicture" })
      .populate("latestMessage");
  };

  const getAllChats = async (currentUserId: string) => {
    const chats = await Chat.find({
      users: { $in: [currentUserId] }
    })
    .populate({ path: "users", select: "userName profilePicture" })
    .populate({path:'latestMessage',select:'content'})
    .sort({updatedAt: -1})
    return chats
  };

  const getOneChat = async(chatId:string) =>{
    return await Chat.findById(chatId)
          .populate({path:"users",select: "userName"})

  } 

  return {
    isChatExist,
    createChat,
    getSingleChatById,
    getAllChats,
    getOneChat
  };
};

export type ChatRepoImpl = typeof chatRepoImpl;
