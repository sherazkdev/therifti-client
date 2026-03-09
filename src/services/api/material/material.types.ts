
import type { MaterialDocument } from "../../types/material/material.types";

export interface GetMaterialsByCategoryApiResponse {
    statusCode:number,
    message:string,
    success:boolean,
    data:MaterialDocument[]
}