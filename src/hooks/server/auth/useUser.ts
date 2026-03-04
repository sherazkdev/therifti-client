import { type LoggedInUserApiResponse, type LoggedInUserResponse } from "../../../api/auth/auth.types";
import { useQuery } from "@tanstack/react-query";

/** Services */
import AuthServices from "../../../api/auth/auth.api";
import ApiServices from "../../../services/api.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const apiServices = new ApiServices(BaseURL);
const authServices = new AuthServices(apiServices);

const useUser = () => {
    return useQuery<LoggedInUserApiResponse,AxiosError,LoggedInUserResponse>({
        queryKey:["authenticatedUser"],
        queryFn: () => authServices.CurrentUser(),
        enabled:true
    })
};
export default useUser;