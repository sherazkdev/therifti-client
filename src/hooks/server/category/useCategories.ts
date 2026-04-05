import type { GetCategoriesApiResponse } from "../../../types/api";
import { useQuery } from "@tanstack/react-query";

/** Services */
import CategoryApi from "../../../api/category.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const categoryApi = new CategoryApi(backendRequestServices);

const useCategories = () => {
    return useQuery<GetCategoriesApiResponse,AxiosError>({
        queryKey:["categories"],
        queryFn: () => categoryApi.GetCategories(),
        enabled:true
    });
};
export default useCategories;