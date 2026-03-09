import { useMutation } from "@tanstack/react-query";

/** Types */

import type { CreateProductApiResponse } from "../../../services/api/product/product.types";
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

const useCreateProduct = () => {
    return useMutation<CreateProductApiResponse,AxiosError>({
        mutationFn:(product:any) => productServices.CreateProduct(product),
        onError:(e) => {
            const err = (e.response?.data as ApiError) || undefined;
            if(err){
                console.log(err)
            }
        },
        onSuccess:(s) => console.log(s)
    })
}

export default useCreateProduct;