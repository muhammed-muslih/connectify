import { ChatRepoInterface } from "@application/repositories/chatRepoInterface";
import AppError from "@utils/appError";
import { HttpStatus } from "@interfaces/httpStatus";

export const acessChat = async(
    currentUserId: string,
    userId: string,
    chatRepo : ReturnType<ChatRepoInterface>
) => {

    if(!userId) {
        throw new AppError('userId not found',HttpStatus.BAD_REQUEST)
    }

    const isChatExist = await chatRepo.isChatExist(currentUserId,userId)
    if(isChatExist) {
        return isChatExist
    }
    const {_id} = await chatRepo.createChat(currentUserId,userId)
    const chat = await chatRepo.getSingleChatById(_id.toString()) 
    return chat

}

export const fetchChats = async(
    currentUserId: string,
    chatRepo : ReturnType<ChatRepoInterface>
)=> {
    const chat = await chatRepo.getAllChats(currentUserId)
    return chat
}