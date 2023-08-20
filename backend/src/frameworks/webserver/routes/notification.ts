import express from 'express';
import notificationController from '@adapters/controllers/notificationController';
import { notificationRepoImpl } from '@frameworks/database/mongoDb/repositories/notificationRepoImpl';
import { notificationrRepoInterface } from '@application/repositories/notificationInterface';

const notificationRouter = () => {
    const router = express.Router()
    const controller = notificationController(notificationRepoImpl,notificationrRepoInterface)

    router.get('/',controller.getNotifications)
    router.post('/mark-as-read',controller.markAsRead)

    return router
}

export default notificationRouter