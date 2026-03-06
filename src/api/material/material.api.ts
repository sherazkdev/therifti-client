import ApiServices from "../../services/api.services";
import type { GetMaterialsByCategoryApiResponse } from "./material.types";


class MaterialServices {
    private apiServices:ApiServices;

    constructor(apiServices:ApiServices){
        this.apiServices = apiServices;
    }

    public async getMaterialsByCategory(categoryId:string):Promise<GetMaterialsByCategoryApiResponse>{
        const response = await this.apiServices.Get<GetMaterialsByCategoryApiResponse>(`/materials/get-Materials-by-category/${categoryId}`);
        return response;
    }
}

export default MaterialServices;