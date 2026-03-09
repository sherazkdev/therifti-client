import { type ForgotAccountApiResponse, type ForgotAccountInterface } from "../../../services/api/auth/auth.types";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthServices from "../../../services/api/auth/auth.api";
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const authServices = new AuthServices(requestMethods);

const useForgot = () => {
    return useMutation<ForgotAccountApiResponse,AxiosError,ForgotAccountInterface>({
        mutationFn: (forgotObj:ForgotAccountInterface) => authServices.ForgotAccount(forgotObj),
    })
};
export default useForgot;