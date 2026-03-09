import { type VerifyForgotAccountOtpApiResponse, type VerifyRegisterationAccountOtpInterface } from "../../../services/api/auth/auth.types";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthServices from "../../../services/api/auth/auth.api";
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const authServices = new AuthServices(requestMethods);;

const useVerifyForgotAccountOtp = () => {
    return useMutation<VerifyForgotAccountOtpApiResponse,AxiosError,VerifyRegisterationAccountOtpInterface>({
        mutationFn: (verifyObj:VerifyRegisterationAccountOtpInterface) => authServices.VerifyOtpForgotAccountVerification(verifyObj),
    })
};
export default useVerifyForgotAccountOtp;