import { useQuery } from "@tanstack/react-query";

/** Services */
import SizeServices from "../../../api/size/size.api";
import ApiServices from "../../../services/api.services";
import { AxiosError } from "axios";
import type { GetSizesByCategoryApiResponse} from "../../../api/size/size.types";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const apiServices = new ApiServices(BaseURL);
const sizeServices = new SizeServices(apiServices);

const useSizesByCategory = (categoryId:string) => {
    return useQuery<GetSizesByCategoryApiResponse,AxiosError>({
        queryKey:["sizes",categoryId],
        queryFn:() => sizeServices.getSizesByCategory(categoryId),
        enabled:!!categoryId
    })
};

export default useSizesByCategory;
