import type BackendRequestServices from "../services/backendRequest.services";
import type { GetBrandsByCategoryApiResponse } from "../types/api/index";


class BrandApi{
    private apiServices:BackendRequestServices;

    constructor(apiServices:BackendRequestServices){
        this.apiServices = apiServices;
    }

    public async getBrandsByCategory(categoryId:string):Promise<GetBrandsByCategoryApiResponse>{
        const response = await this.apiServices.Get<GetBrandsByCategoryApiResponse>(`/brands/get-brands-by-category/${categoryId}`);
        return response;
    }
}

export default BrandApi;