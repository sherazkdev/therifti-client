import BackendRequestMethods from "../../BackendRequestMethods/BackendRequestMethods";
import type { GetMaterialsByCategoryApiResponse } from "./material.types";


class MaterialServices {
    private apiServices:BackendRequestMethods;

    constructor(apiServices:BackendRequestMethods){
        this.apiServices = apiServices;
    }

    public async getMaterialsByCategory(categoryId:string):Promise<GetMaterialsByCategoryApiResponse>{
        const response = await this.apiServices.Get<GetMaterialsByCategoryApiResponse>(`/materials/get-Materials-by-category/${categoryId}`);
        return response;
    }
}

export default MaterialServices;