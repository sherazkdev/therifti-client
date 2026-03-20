
import type { GetChatsMessagesApiResponse, SendMessageApiResponse, SendMessageInterface } from "../types/api";

/** Service */
import type BackendRequestServices from "../services/backendRequest.services";

class MessageApi {
    private backendRequestServices:BackendRequestServices;
    
    constructor(backendRequestServices:BackendRequestServices){
        this.backendRequestServices = backendRequestServices;
    };

    /**
     * Note: Get Chat Messages
     * 
     * This service using for get chat messages history using chatId is required.
     * and your chat message in there.
     * 
     * @param {string} chatId - Selected ChatId for get chat messages uniuqe identifier.
     * 
     * @return {Promise<GetChatsMessagesApiResponse>} Fetched latest chat messages histort returnerd. 
    */
    public async GetChatMessages(chatId:string):Promise<GetChatsMessagesApiResponse> {
        const response = await this.backendRequestServices.Get<GetChatsMessagesApiResponse>(`/messages/chatMessages/${chatId}`);
        return response;
    };

    /** 
     * Note: Send Message to real time comunicate.
     * 
     * This service method using for to send a message using `Rest Api` and catch the message using `socket.io-client`.
     * and to deliver a nessage.
     * 
     * @param {SendMessageInterface} messageObj - Send message object in requeire field is chatId and reciverId and last one content.
     * 
     * @return {Promise<void>}
    */
    public async SendMessage(messageObj:SendMessageInterface):Promise<SendMessageApiResponse> {
        const response = await this.backendRequestServices.Post<SendMessageApiResponse>(`/messages/send`,messageObj);
        return response;
    }
}

export default MessageApi;