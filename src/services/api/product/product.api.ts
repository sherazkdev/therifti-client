import BackendRequestMethods from "../../BackendRequestMethods/BackendRequestMethods";

import type { ProductApiImplmentsInterface, CreateProductApiResponse, FeaturedProductsSortingInterface, FeaturedProductApiResponse } from "./product.types";

/** 
 * Note: This Product Api Service Using for get all product, update product, creare product more than.
 * 
 * Handles all product-related API calls.
 * Can be extended for caching, transformations, and validations.
*/
class ProductServices implements ProductApiImplmentsInterface {

    private apiService:BackendRequestMethods;

    constructor(apiService:BackendRequestMethods){
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

export default ProductServices;