import Notification from "../models/notificationModel";

export const notificationRepoImpl = () => {
  const getNotifications = async (userId: string) => {
    return await Notification.find({ receiver: userId })
      .sort({createdAt:-1})
      .populate({ path: "user", select: "userName profilePicture" })
      .populate({ path: "postId", select: "imageUrl" });
  };

  const markAsRead = async(userId:string) => {
    await Notification.updateMany({receiver: userId},{ $set: { isRead: true } })
  }

  return {
    getNotifications,
    markAsRead
  };
};

export type NotificationRepoImpl = typeof notificationRepoImpl;
