import BackendRequestMethods from "../../BackendRequestMethods/BackendRequestMethods";
import type { GetBrandsByCategoryApiResponse } from "./brand.types";


class BrandServices {
    private apiServices:BackendRequestMethods;

    constructor(apiServices:BackendRequestMethods){
        this.apiServices = apiServices;
    }

    public async getBrandsByCategory(categoryId:string):Promise<GetBrandsByCategoryApiResponse>{
        const response = await this.apiServices.Get<GetBrandsByCategoryApiResponse>(`/brands/get-brands-by-category/${categoryId}`);
        return response;
    }
}

export default BrandServices;