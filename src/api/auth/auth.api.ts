import { type ForgotAccountApiResponse, type ForgotAccountInterface, type LoggedInUserApiResponse, type LoginAccountInterface, type LoginApiResponse, type RegisterAccountInterface, type RegisterApiResponse, type VerifyForgotAccountOtpApiResponse, type VerifyForgotAccountResetTokenAndChangePasswordInterface, type VerifyForgotAccountResetTokenApiResponse,  type VerifyOtpForgotAccountVerificationInterface, type VerifyRegisterationAccountOtpApiResponse, type VerifyRegisterationAccountOtpInterface } from "./auth.types";
import type ApiServices from "../../services/api.services";

class AuthServices {
    private apiServices:ApiServices;

    constructor(apiServices:ApiServices){
        this.apiServices = apiServices;
    }
    
    /**
     * Note: Authenticate a user email and password.
     * 
     * Sends login credentials to the authentication service and
     * returns the full Axios response
     * 
     * @param {LoginAccountInterface} loginObj - An object containing the user's email and password.
     * 
     * @returns {Promise<AxiosResponse>} A promise that resolves with the Axios response from the login API.
    */
    public async LoginWithEmailAndPassword(loginObj:LoginAccountInterface):Promise<LoginApiResponse>{
        const response = await this.apiServices.Post<LoginApiResponse>("/auth/login",loginObj);
        return response;
    };

    public async ForgotAccount(forgotAccountObj:ForgotAccountInterface):Promise<ForgotAccountApiResponse>{
        const response = await this.apiServices.Post<ForgotAccountApiResponse>("/auth/forgot-password",forgotAccountObj);
        return response;
    };
    
    public async VerifyOtpForgotAccountVerification(verifyObj:VerifyOtpForgotAccountVerificationInterface):Promise<VerifyForgotAccountOtpApiResponse>{
        const response = await this.apiServices.Post<VerifyForgotAccountOtpApiResponse>("/auth/verify-forgot-otp",verifyObj);
        return response;
    };

    public async VerifyForgotAccountResetTokenAndChangePassword(verifyObj:VerifyForgotAccountResetTokenAndChangePasswordInterface):Promise<VerifyForgotAccountResetTokenApiResponse>{
        const response = await this.apiServices.Patch<VerifyForgotAccountResetTokenApiResponse>("/auth/reset-password",verifyObj);
        return response;
    };

    public async RegisterAccount(registerAccountObj:RegisterAccountInterface):Promise<RegisterApiResponse>{
        const response = await this.apiServices.Post<RegisterApiResponse>("/auth/register",registerAccountObj);
        return response;
    };

    public async VerifyRegisterationAccountOtp(verifyObj:VerifyRegisterationAccountOtpInterface):Promise<VerifyRegisterationAccountOtpApiResponse>{
        const response = await this.apiServices.Patch<VerifyRegisterationAccountOtpApiResponse>("/auth/registeration-otp-verifier",verifyObj);
        return response;
    };

    public async LogoutAccount(){};

    public async CurrentUser():Promise<LoggedInUserApiResponse> {
        const response = await this.apiServices.Get<LoggedInUserApiResponse>("/auth/current-user");
        return response;
    }
}

export default AuthServices;