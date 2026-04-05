import type BackendRequestServices from "../services/backendRequest.services";

/** Response Types */
import type { FollowSellerApiResponse, UnfollowSellerApiResponse, GetFollowersApiResponse, GetFollowingsApiResponse } from "../types/api";

class FollowApi {
    private backendRequestServices:BackendRequestServices;

    constructor(backendRequestServices:BackendRequestServices){
        this.backendRequestServices = backendRequestServices;
    };

    /**
     * Note: Follow Seller
     *
     * This service method is used to follow a seller.
     * It allows the current user to follow a specific seller 
     * to receive updates or communications related to that seller.
     *
     * @param  {string} followingId - The ID of the seller to follow
     * @returns {Promise<FollowSellerApiResponse>} A confirmation that the follow action was successful.
    */
    public async FollowSeller(followingId:string):Promise<FollowSellerApiResponse>{
        const response = await this.backendRequestServices.Post<FollowSellerApiResponse>("/follows/follow-seller",{followingId});
        return response;
    };

    /**
     * Note: Unfollow Seller
     *
     * This service method is used to unfollow a seller.
     * It allows the current user to stop following a specific seller
     * and stop receiving updates or communications from that seller.
     *
     * @param  {string} followingId - The ID of the seller to unfollow
     * @returns {Promise<UnfollowSellerApiResponse>} A confirmation that the unfollow action was successful.
    */
    public async UnfollowSeller(followingId: string):Promise<UnfollowSellerApiResponse> {
        const response = await this.backendRequestServices.Delete<UnfollowSellerApiResponse>(`/follows/unfollow-seller/${followingId}`);
        return response;
    };

    /**
     * Note: Get Followers
     *
     * This service method fetches all users who are following a specific seller.
     *
     * @param {string} userId - The ID of the seller whose followers are being fetched
     * @returns {Promise<GetFollowersApiResponse[]>} A list of followers for the seller
    */
    public async GetFollowers(userId: string):Promise<GetFollowersApiResponse> {
        const response = await this.backendRequestServices.Get<GetFollowersApiResponse>(`/follows/get-followers/${userId}`);
        return response;
    };

    /**
     * Note: Get Followings
     *
     * This service method fetches all sellers that a specific user is following.
     *
     * @param {string} userId - The ID of the user whose followings are being fetched
     * @returns {Promise<GetFollowingsApiResponse[]>} A list of sellers the user is following
    */
    public async GetFollowings(userId: string):Promise<GetFollowingsApiResponse> {
        const response = await this.backendRequestServices.Get<GetFollowingsApiResponse>(`/follows/get-followings/${userId}`);
        return response;
    };

}

export default FollowApi;