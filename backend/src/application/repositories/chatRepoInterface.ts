import { ChatRepoImpl } from "@frameworks/database/mongoDb/repositories/chatRepoImpl"

export const chatRepoInterface = (repository:ReturnType<ChatRepoImpl>) => {

    const isChatExist = async (currentUserId: string, userId: string) => 
    await repository.isChatExist(currentUserId,userId)

    const createChat = async(currentUserId: string, userId: string) =>
    await repository.createChat(currentUserId,userId)

    const getSingleChatById = async (chatId:string) =>
    await repository.getSingleChatById(chatId)

    const getAllChats = async(curretUsserId:string) => repository.getAllChats(curretUsserId)

    return {
        isChatExist,
        createChat,
        getSingleChatById,
        getAllChats
    }

}

export type ChatRepoInterface = typeof chatRepoInterface