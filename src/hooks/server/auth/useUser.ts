import type { LoggedInUserApiResponse } from "../../../types/api/index";
import { useQuery } from "@tanstack/react-query";

/** Services */
import AuthApi from "../../../api/auth.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";
import { getAccessToken } from "../../../services/auth.services";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const authApi = new AuthApi(backendRequestServices);

const useUser = () => {
    const accessToken = getAccessToken();
    return useQuery<LoggedInUserApiResponse,AxiosError>({
        queryKey:["authenticatedUser"],
        queryFn: () => authApi.CurrentUser(),
        enabled:!!accessToken,
        retry:false
    })
};
export default useUser;