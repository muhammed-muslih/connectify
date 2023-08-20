import { NotificationRepoImpl } from "@frameworks/database/mongoDb/repositories/notificationRepoImpl";

export const notificationrRepoInterface  = (repository:ReturnType<NotificationRepoImpl>) => {
    const getNotifications = async(userId:string) => await repository.getNotifications(userId);

    const markAsRead = async(userId:string) => await repository.markAsRead(userId);

    return {
        getNotifications,
        markAsRead
    }

}

export type NotificationRepoInterface = typeof notificationrRepoInterface