import type BackendRequestServices from "../services/backendRequest.services";
import type { GetSizesByCategoryApiResponse } from "../types/api/index";


class SizeApi {
    private apiServices:BackendRequestServices;

    constructor(apiServices:BackendRequestServices){
        this.apiServices = apiServices;
    }

    public async getSizesByCategory(categoryId:string):Promise<GetSizesByCategoryApiResponse>{
        const response = await this.apiServices.Get<GetSizesByCategoryApiResponse>(`/sizes/get-sizes-by-category/${categoryId}`);
        return response;
    }
}

export default SizeApi;