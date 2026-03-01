import { type LoginApiResponse, type LoginAccountInterface } from "../../interfaces/auth.interfaces";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthServices from "../../services/auth.services";
import ApiServices from "../../services/api.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const apiServices = new ApiServices(BaseURL);
const authServices = new AuthServices(apiServices);

const useLogin = () => {
    return useMutation<LoginApiResponse,AxiosError,LoginAccountInterface>({
        mutationFn: (loginData:LoginAccountInterface) => authServices.LoginWithEmailAndPassword(loginData),
    })
};
export default useLogin;