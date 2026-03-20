/** Note: Brand Document */
export interface BrandDocument {
    _id:string,
    categoryId:string
    brand:string,
    status?:string
};

/** Note: Get Brand By CategoryId Api Response. */
export interface GetBrandsByCategoryApiResponse {
    statusCode:number,
    message:string,
    success:boolean,
    data:BrandDocument[]
}