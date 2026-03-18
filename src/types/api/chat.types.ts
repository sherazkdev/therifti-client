import type { MessageDocumentInterface } from "./message.types";

/** Note: Get Chats ApiResponse */
export interface ChatDocumentInterface {
    _id:string,
    lastMessage:null | MessageDocumentInterface,
    member:{
        _id:string,
        fullname:string,
        avatar:null | string
    },
    productRef:{
        _id:string,
        coverImage:string,
        title:string
    }
};

/** Note: Get Chats Api Response */
export interface GetChatsApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:ChatDocumentInterface[]
};


/** Note: Chat Delete Api Response */
export interface DeleteChatApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:[]
}