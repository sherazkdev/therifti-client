import { useQuery } from "@tanstack/react-query";

/** Services */
import BrandServices from "../../../api/brand/brand.api";
import ApiServices from "../../../services/api.services";
import { AxiosError } from "axios";
import type { GetBrandsByCategoryApiResponse } from "../../../api/brand/brand.types";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const apiServices = new ApiServices(BaseURL);
const brandServices = new BrandServices(apiServices);

const useBrandsByCategoryId = (categoryId:string) => {
    return useQuery<GetBrandsByCategoryApiResponse,AxiosError>({
        queryKey:["brands",categoryId],
        queryFn:() => brandServices.getBrandsByCategory(categoryId),
        enabled:!!categoryId
    })
};

export default useBrandsByCategoryId;
