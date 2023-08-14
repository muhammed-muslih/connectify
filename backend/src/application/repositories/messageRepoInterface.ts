import { NewMessageInt } from "@interfaces/chatInterface"
import { MessageRepoImpl} from "@frameworks/database/mongoDb/repositories/messageRepoImpl"


export const messageRepoInterface = (repository:ReturnType<MessageRepoImpl>) => {

    const createMessage = async(newMessage:NewMessageInt) => await repository.createMessage(newMessage)

    const getMessages = async(chatId:string) => await repository.getMessages(chatId)

    return {
        createMessage,
        getMessages
    }

}

export type MessageRepoInterface = typeof messageRepoInterface