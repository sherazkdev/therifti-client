
import type { GetChatsApiResponse, DeleteChatApiResponse, CreateChatApiResponse, CreateChatInterface } from "../types/api";

/** Service */
import BackendRequestServices from "../services/backendRequest.services";

class ChatApi {
    
    private apiServices:BackendRequestServices;

    constructor(apiServices:BackendRequestServices){
        this.apiServices = apiServices;
    }

    /** 
     * Note: Get Chats only authenticated person.
     * 
     * This service using for real time chat messages to get all chats
     * and chat history to comunicate seller.
     * 
     * @returns {Promise<GetChatsApiResponse>} - Fetched and matched by server chat document.
    */
    public async GetChats():Promise<GetChatsApiResponse> {
        const response = await this.apiServices.Get<GetChatsApiResponse>("/chats/get-chats");
        return response;
    };

    /**
     * Note: Delete Chat Using chatId and delete chat messages history.
     * 
     * This service method using for clear chat using messages to remove a history.
     * 
     * @returns {Promise<DeleteChatApiResponse>} - Delete Chat messsages and chat response.
    */
    public async DeleteChat(chatId:string):Promise<DeleteChatApiResponse> {
        const response = await this.apiServices.Delete<DeleteChatApiResponse>(`/chats/delete-chat/${chatId}`);
        return response;
    };

    /**
     * Note: Create Chat For real time comunicate room.
     * 
     * This service method using for real time comunicate chat room is talk any seller or client to.
     * create a chat room.
     * @param {CreateChatInterface} chatObj - Created chat information fields.
     * 
     * @returns {Promise<CreateChatApiResponse>} Create Chat room response. 
    */
    public async CreateChat(chatObj:CreateChatInterface):Promise<CreateChatApiResponse> {
        const response = await this.apiServices.Post<CreateChatApiResponse>("/chats/get-or-create",chatObj);
        return response;
    };
    
}

export default ChatApi;