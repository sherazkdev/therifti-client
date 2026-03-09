import type { SizeDocument } from "../../types/size/size.types";

export interface GetSizesByCategoryApiResponse {
    statusCode:number,
    message:string,
    success:boolean,
    data:SizeDocument[]
}