/** Create Product ApiResponse */
export interface CreateProductApiResponse {
    success:boolean,
    statusCode:number,
    message:string,
    data:[]
}

export interface ProductApiImplmentsInterface {
    CreateProduct:(product:unknown) => Promise<CreateProductApiResponse>;
}

/** Note: Get Feature Product Sorting */
export interface FeaturedProductsSortingInterface {
  page:number | null,
  limit:number,
  categoryId?:string | null,
  price:{
    min:number,
    max:number
  },
  sizes:string[] | null,
  sort:string | null
}

/** Note: Featured Product Response */
export interface FeaturedProductResponse {
    _id:string,
    title:string,
    coverImage:string,
    totalLikes:number,
    isLiked:boolean,
    price:number,
    parcelSize:string,
    condition:string
};

/** Note: Featured Product ApiResponse */
export interface FeaturedProductApiResponse {
    succes:boolean,
    statusCode:number,
    message:string,
    data:FeaturedProductResponse[]
}