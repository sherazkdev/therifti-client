import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

/** Types */
import type { GetSuggestionApiResponse } from "../../../types/api";

/** Note: Environment variables */
import env from "../../../constants/loadEnv/loadEnv";

/** Services */
import ProductApi from "../../../api/product.api"; 
import BackendRequestServices from "../../../services/backendRequest.services";

/** @note: Server url. */
const BaseURL = env.SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const productApi = new ProductApi(backendRequestServices);

const useSuggestions = () => {
    return useMutation<GetSuggestionApiResponse, AxiosError, string>({
        mutationFn: (q:string) => productApi.GetSuggestions(q),
    });
};

export default useSuggestions;