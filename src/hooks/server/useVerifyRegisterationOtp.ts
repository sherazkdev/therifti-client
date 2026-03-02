import { type VerifyRegisterationAccountOtpApiResponse, type VerifyRegisterationAccountOtpInterface } from "../../api/auth/auth.types";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthServices from "../../api/auth/auth.api";
import ApiServices from "../../services/api.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const apiServices = new ApiServices(BaseURL);
const authServices = new AuthServices(apiServices);

const useVerifyRegisterationOtp = () => {
    return useMutation<VerifyRegisterationAccountOtpApiResponse,AxiosError,VerifyRegisterationAccountOtpInterface>({
        mutationFn: (verifyObj:VerifyRegisterationAccountOtpInterface) => authServices.VerifyRegisterationAccountOtp(verifyObj),
    })
};
export default useVerifyRegisterationOtp;