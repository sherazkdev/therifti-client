import type { ProductCondition } from "../components"

/** Note: Wishlist Document */
export interface WishlistDocument {
    _id:string,
    product:{
        _id:string,
        coverImage:string,
        title:string,
        condition:ProductCondition,
        price:number
    }
};

/** Note: Get Wishlists Api Response */
export interface GetWishlistsApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:WishlistDocument[]
}

/** Note: Add To Wishlist ApiResponse */
export interface AddToWishlistApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:[]
};

/** Note: Removed To Wishlist ApiResponse */
export interface RemovedToWishlistApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:[]
};