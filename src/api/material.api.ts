import type BackendRequestServices from "../services/backendRequest.services";
import type { GetMaterialsByCategoryApiResponse } from "../types/api/index";


class MaterialApi {
    private apiServices:BackendRequestServices;

    constructor(apiServices:BackendRequestServices){
        this.apiServices = apiServices;
    }

    public async getMaterialsByCategory(categoryId:string):Promise<GetMaterialsByCategoryApiResponse>{
        const response = await this.apiServices.Get<GetMaterialsByCategoryApiResponse>(`/materials/get-Materials-by-category/${categoryId}`);
        return response;
    }
}

export default MaterialApi;