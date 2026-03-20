
/** Note: Material Document */
export interface MaterialDocument {
    _id:string,
    categoryId:string,
    material:string,
    status:string
}
/** Note: Get Material By CategoryId Api Response */
export interface GetMaterialsByCategoryApiResponse {
    statusCode:number,
    message:string,
    success:boolean,
    data:MaterialDocument[]
}