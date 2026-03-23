/** Notificatio metaData */
export type NotificationMetaData = {
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


/** Notification Type */
export const NOTIFICATION_TYPES = ["ITEM_LIKED","NEW_MESSAGE","NEW_FOLLOWER"] as const;
export type NotificationTypes = typeof NOTIFICATION_TYPES[number];

/** Notification Status */
export const NOTIFICATION_STATUS = ["READ","UNREAD"] as const;
export type NotifcationStatus = typeof NOTIFICATION_STATUS[number];

/** Note: Notification Document. */
export interface NotificationDocument {
    _id:string,
    recipient_id:string,
    type:NotificationTypes,
    metaData:NotificationMetaData,
    linkUrl:string,
    status:NotifcationStatus
    createdAt: string;
};

/** Note: Get Notification Api Response */ 
export interface GetNotificationApiResponse {
    success:boolean,
    statusCode:number,
    message:string,
    data:NotificationDocument[]
};

/** Note: Mark As Read Api Response */
export interface MarkAsReadApiResponse {
    success:boolean,
    statusCode:number,
    message:string,
    data:[]
};