import type BackendRequestServices from "../services/backendRequest.services";
import type {GetCategoriesApiResponse } from "../types/api/index";


class CategoryApi{
    private apiServices:BackendRequestServices;

    constructor(apiServices:BackendRequestServices){
        this.apiServices = apiServices;
    }

    public async GetCategories():Promise<GetCategoriesApiResponse>{
        const response = await this.apiServices.Get<GetCategoriesApiResponse>(`/categories/get-categories`);
        return response;
    }
}

export default CategoryApi;