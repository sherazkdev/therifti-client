import type { RefreshAccessTokenApiResponse } from "../../../../types/api/index";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthApi from "../../../../api/auth.api";
import BackendRequestServices from "../../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const authApi = new AuthApi(backendRequestServices);

const useRefreshToken = () => {
    return useMutation<RefreshAccessTokenApiResponse,AxiosError,string>({
        mutationFn: (refreshToken:string) => authApi.RefreshAccessToken(refreshToken),
    })
};
export default useRefreshToken;