import type { BrandDocument } from "../../../types/brand/brand.types";

export interface GetBrandsByCategoryApiResponse {
    statusCode:number,
    message:string,
    success:boolean,
    data:BrandDocument[]
}