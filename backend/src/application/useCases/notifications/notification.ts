import { NotificationRepoInterface } from "@application/repositories/notificationInterface"
import AppError from "@utils/appError"
import { HttpStatus } from "@interfaces/httpStatus"

export const findNotifications = async(
    userId: string,
    notificationRepo : ReturnType<NotificationRepoInterface>
) => {
    if(!userId) throw new AppError('user not found',HttpStatus.BAD_REQUEST)
    return await notificationRepo.getNotifications(userId)
}

export const setAsRead = async(
    userId: string,
    notificationRepo : ReturnType<NotificationRepoInterface>
) => {
    if(!userId) throw new AppError('user not found',HttpStatus.BAD_REQUEST)
    return await notificationRepo.markAsRead(userId)

}