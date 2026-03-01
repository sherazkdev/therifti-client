/** @note: Login account interface */
export interface LoginAccountInterface { 
    email:string,
    password:string
};

/** @note: Fogot account interface. */
export interface ForgotAccountInterface {
    email:string
};

/** @note: Verify otp forgot account verification. */
export interface VerifyOtpForgotAccountVerificationInterface {
    email:string,
    otp:string
};

/** @note: Verify forgot account resetToken and changePassword. */
export interface VerifyForgotAccountTokenAndChangePasswordInterface {
    password:string,
    email:string,
    resetToken:string
};

/** @note: Register account. */
export interface RegisterAccountInterface {
    email:string,
    fullname:string,
    username:string,
    password:string,
    zipCode?:number
};

/** @note: Verify registeration otp. */
export interface VerifyRegisterationAccountOtpInterface {
    userId:string,
    otp:string
};

/** @note: Login response. */
export interface LoginResponseInterface {
  user: {
    googleId: string | null;
    facebookId: string | null;
    appleId: string | null;
    fullname: string | null;
    username: string | null;
    email: string;
    avatar: string | null;
    password?: string | null;
    about: string | null;
    phoneNumber: {
      countryCode: string | null;
      nationalNumber: string | null;
    };
    dob: Date | null;
    gender: string;
    isVerfied: boolean;
    lastSeen: Date;
    type: string;
    status: string;
  };
}
/** Api Response */
export interface LoginApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: LoginResponseInterface;
};