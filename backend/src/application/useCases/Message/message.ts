import { MessageRepoInterface } from "@application/repositories/messageRepoInterface";
import { NewMessageInt } from "@interfaces/chatInterface";
import AppError from "@utils/appError";
import { HttpStatus } from "@interfaces/httpStatus";

export const createMessage = async(
    userId: string,
    content: string,
    chatId: string,
    messageRepo : ReturnType<MessageRepoInterface>,
) => {
    if(!content || !chatId) {
        throw new AppError('invalid datas',HttpStatus.BAD_REQUEST)
    }

    const newMessage:NewMessageInt = {
        sender: userId,
        content,
        chatId
    }
    return await messageRepo.createMessage(newMessage)

}

export const getMessages = async (
    chatId:string,
    messageRepo : ReturnType<MessageRepoInterface>,
) => {
    if(!chatId) {
        throw new AppError('chatId not found',HttpStatus.BAD_REQUEST)
    }
    return await messageRepo.getMessages(chatId)
}
