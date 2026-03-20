import { type VerifyForgotAccountOtpApiResponse, type VerifyRegisterationAccountOtpInterface } from "../../../types/api/index";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthApi from "../../../api/auth.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const authApi = new AuthApi(backendRequestServices);;

const useVerifyForgotAccountOtp = () => {
    return useMutation<VerifyForgotAccountOtpApiResponse,AxiosError,VerifyRegisterationAccountOtpInterface>({
        mutationFn: (verifyObj:VerifyRegisterationAccountOtpInterface) => authApi.VerifyOtpForgotAccountVerification(verifyObj),
    })
};
export default useVerifyForgotAccountOtp;