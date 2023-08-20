import { NotificationRepoImpl } from "@frameworks/database/mongoDb/repositories/notificationRepoImpl";
import { NotificationRepoInterface } from "@application/repositories/notificationInterface";
import asyncHandler from 'express-async-handler'
import { CustomRequest } from "@interfaces/customRequestInterface";
import { Response } from "express";
import { findNotifications,setAsRead } from "@application/useCases/notifications/notification";

const notificationController = (
    notificationRepoImpl: NotificationRepoImpl,
    notificcationRepoInterface: NotificationRepoInterface,
    
) => {
    const notificationRepo = notificcationRepoInterface(notificationRepoImpl())

    const getNotifications = asyncHandler(async(req:CustomRequest,res:Response) => {
        const userId = req.userId as string
        const notifications = await findNotifications(userId, notificationRepo)
        res.json({
            status:'success',
            message:'notification fected successfully',
            notifications
        })
    })

    const markAsRead = asyncHandler(async(req:CustomRequest, res:Response) => {
        const userId = req.userId as string
        await setAsRead(userId, notificationRepo)
        res.json({
            status:'success',
            message:'notifications are read successfully',
        })
    })

    return {
        getNotifications,
        markAsRead
    }

}

export default notificationController