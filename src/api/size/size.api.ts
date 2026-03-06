import ApiServices from "../../services/api.services";
import type { GetSizesByCategoryApiResponse } from "./size.types";


class SizeServices {
    private apiServices:ApiServices;

    constructor(apiServices:ApiServices){
        this.apiServices = apiServices;
    }

    public async getSizesByCategory(categoryId:string):Promise<GetSizesByCategoryApiResponse>{
        const response = await this.apiServices.Get<GetSizesByCategoryApiResponse>(`/sizes/get-sizes-by-category/${categoryId}`);
        return response;
    }
}

export default SizeServices;