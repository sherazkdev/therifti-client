import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

/** Types */
import type { 
  SearchProductApiResponse, 
  SearchProductsPayloadInterface 
} from "../../../services/api/product/product.types";
import type { ApiError } from "../../../types/api/apiError";

/** Note: Environment variables */
import env from "../../../constants/loadEnv/loadEnv";

/** Services */
import ProductServices from "../../../services/api/product/product.api"; 
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";

/** @note: Server url. */
const BaseURL = env.SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const productServices = new ProductServices(requestMethods);

const useSearchProducts = () => {
    return useMutation<SearchProductApiResponse, AxiosError, SearchProductsPayloadInterface>({
        mutationFn: (searchPayload: SearchProductsPayloadInterface) => productServices.SearchProducts(searchPayload),
        onError: (e) => {
            const err = (e.response?.data as ApiError) || undefined;
            if (err) {
                console.log(err);
            }
        },
        onSuccess: (s) => console.log(s)
    });
};

export default useSearchProducts;