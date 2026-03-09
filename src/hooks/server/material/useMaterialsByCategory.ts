import { useQuery } from "@tanstack/react-query";

/** Types */
import type { AxiosError } from "axios";
import type { GetMaterialsByCategoryApiResponse } from "../../../services/api/material/material.types";

/** Services */
import MaterialServices from "../../../services/api/material/material.api";
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const materialServices = new MaterialServices(requestMethods);

const useMaterialsByCategory = (categoryId?:string) => {
    return useQuery<GetMaterialsByCategoryApiResponse,AxiosError>({
        queryKey:["materials",categoryId],
        queryFn:() => materialServices.getMaterialsByCategory(categoryId!),
        enabled:!!categoryId
    })
};

export default useMaterialsByCategory;
