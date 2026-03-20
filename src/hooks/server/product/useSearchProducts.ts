import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

/** Types */
import type { SearchProductApiResponse, SearchProductsInterface, ApiError} from "../../../types/api";

/** Note: Environment variables */
import env from "../../../constants/loadEnv/loadEnv";

/** Services */
import ProductApi from "../../../api/product.api"; 
import BackendRequestServices from "../../../services/backendRequest.services";

/** @note: Server url. */
const BaseURL = env.SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const productApi = new ProductApi(backendRequestServices);

const useSearchProducts = () => {
    return useMutation<SearchProductApiResponse, AxiosError, SearchProductsInterface>({
        mutationFn: (searchPayload: SearchProductsInterface) => productApi.SearchProducts(searchPayload),
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