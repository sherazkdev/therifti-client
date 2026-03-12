import { useQuery } from "@tanstack/react-query";

/** Types */
import type { AxiosError } from "axios";
import type { GetMaterialsByCategoryApiResponse } from "../../../types/api/index";

/** Services */
import MaterialApi from "../../../api/material.api";
import BackendRequestServices from "../../../services/backendRequest.services";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const materialApi = new MaterialApi(backendRequestServices);

const useMaterialsByCategory = (categoryId?:string) => {
    return useQuery<GetMaterialsByCategoryApiResponse,AxiosError>({
        queryKey:["materials",categoryId],
        queryFn:() => materialApi.getMaterialsByCategory(categoryId!),
        enabled:!!categoryId
    })
};

export default useMaterialsByCategory;
