import { useQuery } from "@tanstack/react-query";

/** Types */
import { AxiosError } from "axios";
import type { GetSizesByCategoryApiResponse } from "../../../services/api/size/size.types";

/** Services */
import SizeServices from "../../../services/api/size/size.api";
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const sizeServices = new SizeServices(requestMethods);

const useSizesByCategory = (categoryId?:string) => {
    return useQuery<GetSizesByCategoryApiResponse,AxiosError>({
        queryKey:["sizes",categoryId],
        queryFn:() => sizeServices.getSizesByCategory(categoryId!),
        enabled:!!categoryId
    })
};

export default useSizesByCategory;
