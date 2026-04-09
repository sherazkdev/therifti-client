import type BackendRequestServices from "../services/backendRequest.services";

import type { ProductApiImplmentsInterface, CreateProductApiResponse, FeaturedProductsSortingInterface, GetSingleProductApiResponseInterface, FeaturedProductApiResponse, SearchProductApiResponse, SearchProductsInterface, GetSuggestionApiResponse } from "../types/api/index";

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
     * Note: Search Products by Query and Filters.
     * 
     * This service method using for searchProduct and get prduct by category.
     * and added dynamic functionality to fetched sorting wise products.
     * 
     * @param {SearchProductsPayloadInterface} searchPayload - searchPayload detailed object.
     * 
     * @returns {Promise<SearchProductApiResponse>} Search product api response.
    */
    public async SearchProducts(searchPayload:SearchProductsInterface):Promise<SearchProductApiResponse> {
        const response = await this.apiService.Post<SearchProductApiResponse>("/products/search",searchPayload);
        return response;
    }

    /**
     * Note: Get Featured Products.
     * 
     * This service using for get latest products product for home page.
     * and added sorting dynamicly for products.
     * 
     * @param {FeaturedProductsSortingInterface} sortObj - Sorting detailed object.
     * 
     * @returns {Promise<FeaturedProductApiResponse>} Fetched Latest Product response.
    */
    public async GetFeaturedProducts(sortObj:FeaturedProductsSortingInterface):Promise<FeaturedProductApiResponse> {
        const response = await this.apiService.Post<FeaturedProductApiResponse>("/products/featured-products",sortObj);
        return response;
    };

    /** 
     * Note: Get Single Product.
     * 
     * This service method using for click on `product` fetched product information with owner and.
     * similar product ownerproduct full product details using productId.
     * 
     * @param {string} productId - Product Document Uniuqe Identifier.
     * 
     * @returns {Promise<GetSingleProductApiResponseInterface>} Single fetched product response.
    */
    public async GetSingleProduct(productId:string):Promise<GetSingleProductApiResponseInterface> {
        const response = await this.apiService.Get<GetSingleProductApiResponseInterface>(`/products/single-product?productId=${productId}`);
        return response;
    };

    /**
     * Note: Get Suggestions.
     * 
     * This service method using for get search suggestion to find a product using query parameter.
     * 
     * @param {string} q - Search by q parameter variable is required.
     * @returns {Promise<GetSuggestionApiResponse>} Fetch Suggestions Api response.
    */
    public async GetSuggestions(q:string):Promise<GetSuggestionApiResponse>{
        const response = await this.apiService.Get<GetSuggestionApiResponse>(`/products/get-suggestions/${q}`);
        return response;
    };

}

export default ProductApi;