import { useQuery } from "@tanstack/react-query";

/** Types */
import type { GetBrandsByCategoryApiResponse } from "../../../services/api/brand/brand.types";

/** Services */
import BrandServices from "../../../services/api/brand/brand.api";
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const brandServices = new BrandServices(requestMethods);

const useBrandsByCategoryId = (categoryId?:string) => {
    return useQuery<GetBrandsByCategoryApiResponse,AxiosError>({
        queryKey:["brands",categoryId],
        queryFn:() => brandServices.getBrandsByCategory(categoryId!),
        enabled:!!categoryId
    })
};

export default useBrandsByCategoryId;
