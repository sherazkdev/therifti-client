import { type ForgotAccountInterface, type LoginAccountInterface, type LoginApiResponse, type RegisterAccountInterface, type RegisterApiResponse, type VerifyForgotAccountTokenAndChangePasswordInterface, type VerifyOtpForgotAccountVerificationInterface, type VerifyRegisterationAccountOtpInterface, type VerifyRegisterationAccountOtpResponse } from "./auth.types";
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

    public async ForgotAccount(forgotAccountObj:ForgotAccountInterface){
        
    };
    
    public async VerifyOtpForgotAccountVerification(verifyObj:VerifyOtpForgotAccountVerificationInterface){};

    public async VerifyForgotAccountTokenAndChangePassword(verifyObj:VerifyForgotAccountTokenAndChangePasswordInterface){};

    public async RegisterAccount(registerAccountObj:RegisterAccountInterface):Promise<RegisterApiResponse>{
        const response = await this.apiServices.Post<RegisterApiResponse>("/auth/register",registerAccountObj);
        return response;
    };

    public async VerifyRegisterationAccountOtp(verifyObj:VerifyRegisterationAccountOtpInterface):Promise<VerifyRegisterationAccountOtpResponse>{
        const response = await this.apiServices.Patch<VerifyRegisterationAccountOtpResponse>("/auth/registeration-otp-verifier",verifyObj);
        return response;
    };

    public async LogoutAccount(){};
}

export default AuthServices;