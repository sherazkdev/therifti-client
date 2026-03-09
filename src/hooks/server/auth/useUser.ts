import type { LoggedInUserResponse,LoggedInUserApiResponse } from "../../../services/api/auth/auth.types";
import { useQuery } from "@tanstack/react-query";

/** Services */
import AuthServices from "../../../services/api/auth/auth.api";
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const authServices = new AuthServices(requestMethods);

const useUser = () => {
    return useQuery<LoggedInUserApiResponse,AxiosError,LoggedInUserResponse>({
        queryKey:["authenticatedUser"],
        queryFn: () => authServices.CurrentUser(),
        enabled:false
    })
};
export default useUser;