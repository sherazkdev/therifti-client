import { useQuery } from "@tanstack/react-query";

/** Types */
import type { GetBrandsByCategoryApiResponse } from "../../../types/api/index";

/** Services */
import BrandApi from "../../../api/brand.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const brandApi = new BrandApi(backendRequestServices);

const useBrandsByCategoryId = (categoryId?:string) => {
    return useQuery<GetBrandsByCategoryApiResponse,AxiosError>({
        queryKey:["brands",categoryId],
        queryFn:() => brandApi.getBrandsByCategory(categoryId!),
        enabled:!!categoryId
    })
};

export default useBrandsByCategoryId;
