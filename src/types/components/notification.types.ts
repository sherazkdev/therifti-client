/** Notificatio metaData */
type NotificationMetaData = {
    /** Item Like */
    actorId:string,
    actorName?:string,
    entityId:string,
    itemTitle:string
} | {
    /** Follow User */
    followerId: string;
    followerName?: string;
    followedId: string;
} | {
    /** New Message */
    senderId: string;
    senderName?: string;
    chatId: string;
    lastMessage: string;
};

export interface Notification {
    message:string,
    status:string,
    title:string,
    icon:string,
    createdAt:string
}

/** Notification Type */
export const NOTIFICATION_TYPES = ["ITEM_LIKED","NEW_MESSAGE","NEW_FOLLOWER"] as const;
export type NotificationTypes = typeof NOTIFICATION_TYPES[number];

/** Notification Status */
export const NOTIFICATION_STATUS = ["READ","UNREAD"] as const;
export type NotifcationStatus = typeof NOTIFICATION_STATUS[number];

/** Note: Notification Document. */
export interface NotificationDocument {
    recipient_id:string /* Note: Notifier*/,
    type:NotificationTypes,
    metaData:NotificationMetaData,
    linkUrl:string,
    createdAt?: string;
  
}