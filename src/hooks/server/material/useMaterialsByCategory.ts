import { useQuery } from "@tanstack/react-query";

/** Services */
import MaterialServices from "../../../api/material/material.api";
import ApiServices from "../../../services/api.services";
import { AxiosError } from "axios";
import type { GetMaterialsByCategoryApiResponse} from "../../../api/material/material.types";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const apiServices = new ApiServices(BaseURL);
const materialServices = new MaterialServices(apiServices);

const useMaterialsByCategory = (categoryId?:string) => {
    return useQuery<GetMaterialsByCategoryApiResponse,AxiosError>({
        queryKey:["materials",categoryId],
        queryFn:() => materialServices.getMaterialsByCategory(categoryId!),
        enabled:!!categoryId
    })
};

export default useMaterialsByCategory;
