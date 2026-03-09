import { type RegisterApiResponse, type RegisterAccountInterface } from "../../../services/api/auth/auth.types";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthServices from "../../../services/api/auth/auth.api";
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const authServices = new AuthServices(requestMethods);

const useRegister = () => {
    return useMutation<RegisterApiResponse,AxiosError,RegisterAccountInterface>({
        mutationFn: (registerObj:RegisterAccountInterface) => authServices.RegisterAccount(registerObj),
    })
};
export default useRegister;