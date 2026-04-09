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
    product:{
        _id:string,
        price:number,
        owner:{
            _id:string
        }
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
};

/** Note: Create Chat Interface */
export interface CreateChatInterface {
    productRef:string,
    member:string
};

/** Note: Create Chat ApiResponse */
export interface CreateChatApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:{
        _id:string
    }
}