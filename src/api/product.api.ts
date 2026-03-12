import type BackendRequestServices from "../services/backendRequest.services";

import type { ProductApiImplmentsInterface, CreateProductApiResponse, FeaturedProductsSortingInterface, FeaturedProductApiResponse } from "../types/api/index";

/** 
 * Note: This Product Api Service Using for get all product, update product, creare product more than.
 * 
 * Handles all product-related API calls.
 * Can be extended for caching, transformations, and validations.
*/
class ProductApi implements ProductApiImplmentsInterface {

    private apiService:BackendRequestServices;

    constructor(apiService:BackendRequestServices){
        this.apiService = apiService;
    }

    /**
     * Note: Create Product Rest Api.
     * 
     * This Service using for create new product for website users
     * @param {any} product - Create Product Document
     * @returns {Promise<CreateProductApiResponse>} If Created Product response.
    */
    public async CreateProduct(product: any):Promise<CreateProductApiResponse> {
        const response = await this.apiService.Post<CreateProductApiResponse>("/products/create-product",product);
        return response;
    };

    /**
     * Note: Get Featured Products.
    */
    public async GetFeaturedProducts(sortObj:FeaturedProductsSortingInterface):Promise<FeaturedProductApiResponse> {
        const response = await this.apiService.Post<FeaturedProductApiResponse>("/products/featured-products",sortObj);
        return response;
    }
}

export default ProductApi;