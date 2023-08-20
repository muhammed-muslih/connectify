import { MessageRepoImpl } from "@frameworks/database/mongoDb/repositories/messageRepoImpl"
import { MessageRepoInterface } from "@application/repositories/messageRepoInterface"
import { CustomRequest } from "@interfaces/customRequestInterface"
import { Response } from "express"
import asyncHandler from "express-async-handler"
import { createMessage ,getMessages} from "@application/useCases/message/message"


const messageController = (
    messageRepoImpl: MessageRepoImpl,
    messageRepoInterface: MessageRepoInterface

) => {

    const messageRepo = messageRepoInterface(messageRepoImpl())

    const createNewMessage = asyncHandler(async(req:CustomRequest,res:Response) => {
        const userId = req.userId as string
        const {content,chatId} = req.body
        const message = await createMessage(userId,content,chatId,messageRepo)
        res.json({
            status:'success',
            message: 'new mesage created successfully',
        })

    })

    const fetchMessages = asyncHandler(async(req:CustomRequest,res:Response) => {
        const {chatId} = req.params
        const data = await getMessages(chatId,messageRepo)
        res.json({
            status:'success',
            message:'messages fetched successfully',
            data
        })
    })

    return {
        createNewMessage,
        fetchMessages
    }


}

export default messageController