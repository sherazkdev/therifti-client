/** Message Status */
export const MESSAGE_STATUS = ["SENT","DELIVERD","SEEN","PENDING"] as const
export type MessageStatus = typeof MESSAGE_STATUS[number];

/** Note: Message Document */
export interface MessageDocumentInterface {
    _id:string,
    chatId:string,
    sender:{
        _id:string,
        fullname?:string,
        avatar?:string
    }
    content:string,
    status:MessageStatus,
    createdAt:Date
};

/** Note: Get Chats Messages Api Response */
export interface GetChatsMessagesApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:MessageDocumentInterface[]
};

/** Note: Send Message Payload */
export interface SendMessageInterface {
    content:string,
    receiverId:string,
    chatId:string
}

/** Note: Send Message Api Response. */
export interface SendMessageApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:[]
};