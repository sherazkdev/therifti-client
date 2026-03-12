import { useMutation } from "@tanstack/react-query";

/** Types */

import type { FeaturedProductApiResponse,FeaturedProductsSortingInterface } from "../../../types/api/index";
import { AxiosError } from "axios";

/** Note: Envorment variables */
import env from "../../../constants/loadEnv/loadEnv";

import ProductApi from "../../../api/product.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { ApiError } from "../../../types/api/api.types";

/** @note: Server url. */
const BaseURL = env.SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const productApi = new ProductApi(backendRequestServices);

const useFeaturedProducts = () => {
    return useMutation<FeaturedProductApiResponse,AxiosError,FeaturedProductsSortingInterface>({
        mutationFn:(sortingObj:FeaturedProductsSortingInterface) => productApi.GetFeaturedProducts(sortingObj),
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