/** Message Status */
export const MESSAGE_STATUS = ["DELETED","ENABLED"] as const;

export const OFFER_STATUS = ["PENDING","ACCEPTED","CANCELLED"] as const;
export const SEEN_STATUS = ["SENT","SEEN"] as const;
export const TYPE_STATUS = ["TEXT","OFFER","FILE"] as const;
export type offerStatus = typeof OFFER_STATUS[number];
export type SeenStatus = typeof SEEN_STATUS[number];
export type TypeStatus = typeof TYPE_STATUS[number];
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
    content:string | null,
    offer?:{
        previousOfferId:string | null
        offeredPrice:number,
        status:offerStatus,
    },
    type:TypeStatus,
    seen:SeenStatus,
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


/** Payload for creating an offer on a product */
export interface SendOfferInterface {
    productId: string;
    offeredPrice: number;
    receiverId:string;
}
  
export interface SendOfferApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        chatId:string
    };
};

export interface AcceptOfferApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: []
};


export interface CancelOfferApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: []
};
  