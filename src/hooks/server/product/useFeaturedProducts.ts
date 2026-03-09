import { useMutation } from "@tanstack/react-query";

/** Types */

import type { FeaturedProductApiResponse,FeaturedProductsSortingInterface } from "../../../services/api/product/product.types";
import { AxiosError } from "axios";

/** Note: Envorment variables */
import env from "../../../constants/loadEnv/loadEnv";

import ProductServices from "../../../services/api/product/product.api"; 
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";
import type { ApiError } from "../../../types/api/apiError";

/** @note: Server url. */
const BaseURL = env.SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const productServices = new ProductServices(requestMethods);

const useFeaturedProducts = () => {
    return useMutation<FeaturedProductApiResponse,AxiosError,FeaturedProductsSortingInterface>({
        mutationFn:(sortingObj:FeaturedProductsSortingInterface) => productServices.GetFeaturedProducts(sortingObj),
        onError:(e) => {
            const err = (e.response?.data as ApiError) || undefined;
            if(err){
                console.log(err)
            }
        },
        onSuccess:(s) => console.log(s)
    })
}

export default useFeaturedProducts;