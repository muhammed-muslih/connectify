import express from 'express';
import messageController from '@adapters/controllers/messageController';
import { messageRepoImpl } from '@frameworks/database/mongoDb/repositories/messageRepoImpl';
import { messageRepoInterface } from '@application/repositories/messageRepoInterface';

const messageRouter = () => {
    const router = express.Router()
    const controller = messageController(messageRepoImpl,messageRepoInterface)

    router.post('/',controller.createNewMessage)
    router.get('/:chatId',controller.fetchMessages)

    return router 
    
}

export default messageRouter