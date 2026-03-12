import { useQuery } from "@tanstack/react-query";

/** Types */
import { AxiosError } from "axios";
import type { GetSizesByCategoryApiResponse } from "../../../types/api/index";

/** Services */
import SizeApi from "../../../api/size.api";
import BackendRequestServices from "../../../services/backendRequest.services";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const sizeApi = new SizeApi(backendRequestServices);

const useSizesByCategory = (categoryId?:string) => {
    return useQuery<GetSizesByCategoryApiResponse,AxiosError>({
        queryKey:["sizes",categoryId],
        queryFn:() => sizeApi.getSizesByCategory(categoryId!),
        enabled:!!categoryId
    })
};

export default useSizesByCategory;
