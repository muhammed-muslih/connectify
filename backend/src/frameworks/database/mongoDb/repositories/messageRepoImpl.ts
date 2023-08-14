import Message from "../models/messageModel"
import Chat from "../models/chatModel"
import { NewMessageInt } from "@interfaces/chatInterface"

export const messageRepoImpl = () => {

    const createMessage = async (newMessage:NewMessageInt) => {
      const message =   await Message.create(newMessage)
      await Chat.findByIdAndUpdate(newMessage.chatId,{latestMessage:message._id})
      return message

    } 

    const getMessages = async(chatId:string) => await Message.find({chatId})

     

    return {
        createMessage,
        getMessages
    }

}
export type MessageRepoImpl = typeof messageRepoImpl