import { type ForgotAccountInterface, type LoginAccountInterface, type LoginApiResponse, type RegisterAccountInterface, type VerifyForgotAccountTokenAndChangePasswordInterface, type VerifyOtpForgotAccountVerificationInterface, type VerifyRegisterationAccountOtpInterface } from "../interfaces/auth.interfaces";
import type ApiServices from "./api.services";

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

    public async RegisterAccount(registerAccountObj:RegisterAccountInterface){};

    public async VerifyRegisterationAccountOtp(verifyObj:VerifyRegisterationAccountOtpInterface){};

    public async LogoutAccount(){};
}

export default AuthServices;