/** Note: Get Folllower Response */
export interface GetFollowersInterface {
    _id:string,
    follower:{
        _id:string,
        fullname:string,
        avatar:string
    },
    followingId:1,
    createdAt:Date
};

/** Note: Get Followings Response */
export interface GetFollowingsInterface {
    _id:string,
    followings:{
        _id:string,
        fullname:string,
        avatar:string
    },
    followingId:1,
    createdAt:Date
};

/** Note: Get Followings Api Response */
export interface GetFollowersApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:GetFollowersInterface[] 
};

/** Note: Get Followings Api Response */
export interface GetFollowingsApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:GetFollowingsInterface[] 
};

/** Note: Follow Seller Api Response */
export interface FollowSellerApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:[]
};

/** Note: Follow Seller Api Response */
export interface UnfollowSellerApiResponse {
    statusCode:number,
    success:boolean,
    message:string,
    data:[]
};