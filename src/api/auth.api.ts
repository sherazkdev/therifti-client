
import { type ForgotAccountApiResponse, type ForgotAccountInterface, type LoggedInUserApiResponse, type LoginAccountInterface, type LoginApiResponse, type RefreshAccessTokenApiResponse, type RegisterAccountInterface, type RegisterApiResponse, type VerifyForgotAccountOtpApiResponse, type VerifyForgotAccountResetTokenAndChangePasswordInterface, type VerifyForgotAccountResetTokenApiResponse,  type VerifyOtpForgotAccountVerificationInterface, type VerifyRegisterationAccountOtpApiResponse, type VerifyRegisterationAccountOtpInterface } from "../types/api/index";
import type BackendRequestServices from "../services/backendRequest.services";

class AuthApi {
    private apiServices:BackendRequestServices;

    constructor(apiServices:BackendRequestServices){
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

    /**
     * Initiates the forgot password flow by sending user's email to the backend.
     * 
     * @param {ForgotAccountInterface} forgotAccountObj - Object containing user's email.
     * @returns {Promise<ForgotAccountApiResponse>} Axios response from the forgot password API.
    */
    public async ForgotAccount(forgotAccountObj:ForgotAccountInterface):Promise<ForgotAccountApiResponse>{
        const response = await this.apiServices.Post<ForgotAccountApiResponse>("/auth/forgot-password",forgotAccountObj);
        return response;
    };

    /**
     * Verifies the OTP sent for forgot password.
     * 
     * @param {VerifyOtpForgotAccountVerificationInterface} verifyObj - Object containing email/OTP.
     * @returns {Promise<VerifyForgotAccountOtpApiResponse>} Axios response from the OTP verification API.
    */
    public async VerifyOtpForgotAccountVerification(verifyObj:VerifyOtpForgotAccountVerificationInterface):Promise<VerifyForgotAccountOtpApiResponse>{
        const response = await this.apiServices.Post<VerifyForgotAccountOtpApiResponse>("/auth/verify-forgot-otp",verifyObj);
        return response;
    };

    /**
     * Verifies the reset token and updates the password for a forgot password flow.
     * 
     * @param {VerifyForgotAccountResetTokenAndChangePasswordInterface} verifyObj - Object containing reset token and new password.
     * @returns {Promise<VerifyForgotAccountResetTokenApiResponse>} Axios response from the reset password API.
    */
    public async VerifyForgotAccountResetTokenAndChangePassword(verifyObj:VerifyForgotAccountResetTokenAndChangePasswordInterface):Promise<VerifyForgotAccountResetTokenApiResponse>{
        const response = await this.apiServices.Patch<VerifyForgotAccountResetTokenApiResponse>("/auth/reset-password",verifyObj);
        return response;
    };

    /**
     * Registers a new user account.
     * 
     * @param {RegisterAccountInterface} registerAccountObj - Object containing registration details.
     * @returns {Promise<RegisterApiResponse>} Axios response from the registration API.
    */
    public async RegisterAccount(registerAccountObj:RegisterAccountInterface):Promise<RegisterApiResponse>{
        const response = await this.apiServices.Post<RegisterApiResponse>("/auth/register",registerAccountObj);
        return response;
    };

    /**
     * Verifies the OTP sent during registration.
     * 
     * @param {VerifyRegisterationAccountOtpInterface} verifyObj - Object containing registration OTP.
     * @returns {Promise<VerifyRegisterationAccountOtpApiResponse>} Axios response from the registration OTP verification API.
    */
    public async VerifyRegisterationAccountOtp(verifyObj:VerifyRegisterationAccountOtpInterface):Promise<VerifyRegisterationAccountOtpApiResponse>{
        const response = await this.apiServices.Patch<VerifyRegisterationAccountOtpApiResponse>("/auth/registeration-otp-verifier",verifyObj);
        return response;
    };

    /**
     * Logs out the currently authenticated user.
     * 
     * @returns {Promise<void>} Resolves when logout is complete.
    */
    public async LogoutAccount(){};

    /**
     * Fetches the currently authenticated user's details.
     * 
     * @returns {Promise<LoggedInUserApiResponse>} Axios response containing the current user's data.
    */
    public async CurrentUser():Promise<LoggedInUserApiResponse> {
        const response = await this.apiServices.Get<LoggedInUserApiResponse>("/auth/current-user");
        return response;
    };

    /** 
     * Note: Refresh Access Token Api Service.
     * 
     * this service using for jwt accesToken is expired to generate a new accessToken.
     * @return {Promise<RefreshAccessTokenApiResponse>} - Created Token response
    */
    public async RefreshAccessToken(refreshToken:string):Promise<RefreshAccessTokenApiResponse>{
        const response = await this.apiServices.Post<RefreshAccessTokenApiResponse>("/auth/refresh-token",{refreshToken});
        return response;
    }
}

export default AuthApi;