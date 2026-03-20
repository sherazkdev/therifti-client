import type BackendRequestServices from "../services/backendRequest.services";

/** Response Types */
import type { GetNotificationApiResponse, MarkAsReadApiResponse } from "../types/api";

class NotificationApi {
    private backendRequestServices:BackendRequestServices;

    constructor(backendRequestServices:BackendRequestServices){
        this.backendRequestServices = backendRequestServices;
    };

    /**
     * Note: Get Notifications.
     * 
     * This service method using purpose in if u are ofline to and send any seller | user send a message to create a notification,
     * Price drop, follow | unfollow etc.
     * 
     * @returns {Promise<GetNotificationApiResponse>} Fetched notifcation response object. 
    */
    public async GetNotifications():Promise<GetNotificationApiResponse>{
        const response = await this.backendRequestServices.Get<GetNotificationApiResponse>("/notifications/get-notifications");
        return response;
    };

    /**
     * Note: Mark As Read Notifications.
     * 
     * This service method using for read a single notification if we send notificationId to read a singleNotification.
     * if we not send to read a all notification mark as read all.
     * 
     * @param {string} notificationId - Optional notification for a read notification.
     * 
     * @returns {Promise<MarkAsReadApiResponse>} Marks as read notification response object. 
    */
    public async MarkAsRead(notifcationId?:string):Promise<MarkAsReadApiResponse> {
        const response = await this.backendRequestServices.Patch<MarkAsReadApiResponse>("/notifications/mark-as-read",{notifcationId});
        return response;
    };
};

export default NotificationApi;