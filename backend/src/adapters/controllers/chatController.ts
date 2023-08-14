import { ChatRepoImpl } from "@frameworks/database/mongoDb/repositories/chatRepoImpl"
import { ChatRepoInterface } from "@application/repositories/chatRepoInterface"
import asyncHandler from "express-async-handler"
import { Response } from "express"
import { CustomRequest } from "@interfaces/customRequestInterface"
import { acessChat,fetchChats } from "@application/useCases/chat/chat"


 const chatController = (
    chatRepoImpl : ChatRepoImpl,
    chatRepoInterface : ChatRepoInterface,
) =>{
    const chatRepo = chatRepoInterface(chatRepoImpl())

    const acessUserChat = asyncHandler(async(req:CustomRequest,res:Response) => {
        const {userId} = req.body 
        console.log(userId);
        const currentUserId = req.userId as string
        const result = await acessChat(currentUserId,userId,chatRepo)
        res.json({
            status:'success',
            message:'chat fected successfully',
        })
    })

    const fetchUserChats = asyncHandler(async(req:CustomRequest,res:Response) =>{
        const currentUserId = req.userId as string
        const result = await fetchChats(currentUserId,chatRepo)
        res.json({
            status:'success',
            message:'chats fected successfully',
            chats: result
        })

    })

    return {
        acessUserChat,
        fetchUserChats
    }

}

export default chatController