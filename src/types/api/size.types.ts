/** Note: Size Document */
export interface SizeDocument {
    _id:string,
    international:string,
    EU:string,
    US:string | null,
    UK:string | null
    waist:string | null
};

/** Note: Get Size By CategoryId Api Response. */
export interface GetSizesByCategoryApiResponse {
    statusCode:number,
    message:string,
    success:boolean,
    data:SizeDocument[]
}