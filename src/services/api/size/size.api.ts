import BackendRequestMethods from "../../BackendRequestMethods/BackendRequestMethods";
import type { GetSizesByCategoryApiResponse } from "./size.types";

class SizeServices {

    private apiServices:BackendRequestMethods;

    constructor(apiServices:BackendRequestMethods){
        this.apiServices = apiServices;
    }

    public async getSizesByCategory(
        categoryId:string
    ):Promise<GetSizesByCategoryApiResponse>{

        const response = await this.apiServices.Get<GetSizesByCategoryApiResponse>(
            `/sizes/get-sizes-by-category/${categoryId}`
        );

        return response;
    }
}

export default SizeServices;