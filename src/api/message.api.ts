
import type { GetChatsMessagesApiResponse, SendMessageApiResponse, SendMessageInterface, SendOfferInterface, SendOfferApiResponse, AcceptOfferApiResponse, CancelOfferApiResponse } from "../types/api";

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

    /**
     * Note: Send Offer for product.
     * 
     * This service using for if price is very high to send a offer to seller if accept to buy product.
     * other way cancel option new offer by seller.
     * 
     * @param {SendOfferInterface} offerObj - send offer details object.
     * @returns {Promise<SendOfferApiResponse>}
     */
    public async SendOffer(offerObj: SendOfferInterface): Promise<SendOfferApiResponse> {
        const response = await this.backendRequestServices.Post<SendOfferApiResponse>("/messages/send-offer", offerObj);
        return response;
    };

    /**
     * Note: Accept an offer for a product.
     * 
     * This service is used to accept an offer made by the buyer for a product. It triggers the acceptance
     * of the offer, which could be followed by further processing like confirming the sale or providing
     * additional instructions to the buyer.
     * 
     * @param {string} offerId - The unique identifier for the offer to be accepted.
     * @returns {Promise<AcceptOfferApiResponse>} - A promise that resolves to the API response containing
     *                                             the result of accepting the offer.
     */
    public async AcceptOffer(offerId:string):Promise<AcceptOfferApiResponse> {
        const response = await this.backendRequestServices.Patch<AcceptOfferApiResponse>(`/messages/${offerId}/accept`);
        return response;  
    };

    /**
     * Note: Cancel an offer for a product.
     * 
     * This service is used to cancel an offer made by the seller for a product. This could be used in
     * scenarios where the seller decides to revoke the offer, or the buyer chooses not to accept it.
     * 
     * @param {string} offerId - The unique identifier for the offer to be canceled.
     * @returns {Promise<CancelOfferApiResponse>} - A promise that resolves to the API response containing
     *                                               the result of canceling the offer.
     */
    public async CancelOffer(offerId:string):Promise<CancelOfferApiResponse> {
        const response = await this.backendRequestServices.Patch<CancelOfferApiResponse>(`/messages/${offerId}/cancel`);
        return response;  
    };
}

export default MessageApi;