import type { VerifyForgotAccountResetTokenAndChangePasswordInterface,VerifyForgotAccountResetTokenApiResponse} from "../../../types/api/index";
import { useMutation } from "@tanstack/react-query";

/** Services */
import AuthApi from "../../../api/auth.api";
import BackendRequestServices from "../../../services/backendRequest.services";
import type { AxiosError } from "axios";

/** @note: Server url. */
const BaseURL = import.meta.env.VITE_SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const authApi = new AuthApi(backendRequestServices);

const useVerifyForgotAccountResetTokenAndChangePassword = () => {
    return useMutation<VerifyForgotAccountResetTokenApiResponse,AxiosError,VerifyForgotAccountResetTokenAndChangePasswordInterface>({
        mutationFn: (verifyObj:VerifyForgotAccountResetTokenAndChangePasswordInterface) => authApi.VerifyForgotAccountResetTokenAndChangePassword(verifyObj),
    })
};
export default useVerifyForgotAccountResetTokenAndChangePassword;