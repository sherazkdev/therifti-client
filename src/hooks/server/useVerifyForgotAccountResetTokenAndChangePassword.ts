import type { VerifyForgotAccountResetTokenAndChangePasswordInterface,VerifyForgotAccountResetTokenApiResponse} from "../../api/auth/auth.types";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthServices from "../../api/auth/auth.api";
import ApiServices from "../../services/api.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const apiServices = new ApiServices(BaseURL);
const authServices = new AuthServices(apiServices);

const useVerifyForgotAccountResetTokenAndChangePassword = () => {
    return useMutation<VerifyForgotAccountResetTokenApiResponse,AxiosError,VerifyForgotAccountResetTokenAndChangePasswordInterface>({
        mutationFn: (verifyObj:VerifyForgotAccountResetTokenAndChangePasswordInterface) => authServices.VerifyForgotAccountResetTokenAndChangePassword(verifyObj),
    })
};
export default useVerifyForgotAccountResetTokenAndChangePassword;