import ApiServices from "../../services/api.services";
import type { GetBrandsByCategoryApiResponse } from "./brand.types";


class BrandServices {
    private apiServices:ApiServices;

    constructor(apiServices:ApiServices){
        this.apiServices = apiServices;
    }

    public async getBrandsByCategory(categoryId:string):Promise<GetBrandsByCategoryApiResponse>{
        const response = await this.apiServices.Get<GetBrandsByCategoryApiResponse>(`/brands/get-brands-by-category/${categoryId}`);
        return response;
    }
}

export default BrandServices;