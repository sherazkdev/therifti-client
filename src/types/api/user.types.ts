/** Note: Update User Profile Interface */
export interface UpdateUserProfileInterface {
    coverImage?:string;
    about?:string;
    username?:string;
    address?:{
        country:string;
        city:string;
        town:string
    }
};

/** Note: Update User Profile Api Response */
export interface UpdateUserProfileApiResponse {
    statusCode:number;
    message:string;
    success:boolean;
    data:[]
};