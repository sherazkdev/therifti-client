import { type LoginApiResponse, type LoginAccountInterface } from "../../../types/api/index";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthApi from "../../../api/auth.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const authApi = new AuthApi(backendRequestServices);

const useLogin = () => {
    return useMutation<LoginApiResponse,AxiosError,LoginAccountInterface>({
        mutationFn: (loginData:LoginAccountInterface) => authApi.LoginWithEmailAndPassword(loginData),
    })
};
export default useLogin;