import type BackendRequestServices from "../services/backendRequest.services";

/** Note: Response Types */
import type { AddToWishlistApiResponse, RemovedToWishlistApiResponse, GetWishlistsApiResponse } from "../types/api/";

class WishlistApi {
    private backendRequestServices:BackendRequestServices;

    constructor(backendRequestServices:BackendRequestServices){
        this.backendRequestServices = backendRequestServices;
    };

    /**
     * Note: Get Wishlists
     * 
     * This service method using for get fav items using this method.
     * required only user.
     * 
     * @returns {Promise<GetWishlistsApiResponse>} Fetched wishlist documents. 
    */
    public async GetWishlists():Promise<GetWishlistsApiResponse> {
        const response = await this.backendRequestServices.Get<GetWishlistsApiResponse>("/wishlists/get-wishlists");
        return response;
    };

    /**
     * Note: Add To Wishlist
     * 
     * This service method using add your fav products to a wishlist items.
     * 
     * @param {string} productId - Wishlist product Indetifier Id.
     * 
     * @returns {Promise<AddToWishlistApiResponse>} Added Fav items response. 
    */
    public async AddToWishlist(productId:string):Promise<AddToWishlistApiResponse> {
        const response = await this.backendRequestServices.Post<AddToWishlistApiResponse>("/wishlists/add-to-wishlist",{productId});
        return response;
    };

    /** 
     * Note: Remove To Wishlist.
     * 
     * This Service using for if you added fav items to remove you items wishlists.
     * 
     * @param {string} productId - Wshlist Product Document unique Indetifier wishlistId.
     * 
     * @returns {Promise<RemovedToWishlistApiResponse>} Removed Fav items response. 
    */
    public async RemoveToWishlist(productId:string):Promise<RemovedToWishlistApiResponse> {
        const response = await this.backendRequestServices.Delete<RemovedToWishlistApiResponse>(`/wishlists/remove-to-wishlist/${productId}`);
        return response;
    };
    
}

export default WishlistApi;