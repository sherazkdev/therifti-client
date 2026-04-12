
/** @note: User Document Interface. */
export interface UserDocumentInterface {
  _id:string,
  googleId: string | null;
  facebookId: string | null;
  appleId: string | null;
  fullname: string | null;
  username: string | null;
  email: string;
  avatar: string | null;
  password?: string | null;
  about: string | null;
  phoneNumber?: {
    countryCode: string | null;
    nationalNumber: string | null;
  };
  dob: Date | null;
  gender: string;
  isVerfied: boolean;
  lastSeen: Date;
  type: string;
  status: string;
  address?:{
    _id:string;
    userId:string;
    country?:string;
    city?:string;
    area?:string;
    streetAddress?:string;
    isDefault:boolean
  }
};


/** @note: AuthContext Type */
export interface AuthContextType {
    isAuthenticated:boolean,
    user:UserDocumentInterface | null,
    handleSetUser:(user:UserDocumentInterface) => void,
};

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
  userId:string,
  otp:string
};

/** @note: Verify forgot account resetToken and changePassword. */
export interface VerifyForgotAccountResetTokenAndChangePasswordInterface {
  password:string,
  userId:string,
  resetToken:string
};

/** @note: Register account. */
export interface RegisterAccountInterface {
  email:string,
  fullname:string,
  username:string,
  password:string,
  zipCode:number | null
};

/** @note: Verify registeration otp. */
export interface VerifyRegisterationAccountOtpInterface {
  userId:string,
  otp:string
};

/** @note: Login response. */
export type LoginResponseInterface = {
  user:UserDocumentInterface,
  tokens:{
    refreshToken:string,
    accessToken:string
  }
};

export interface ForgotAccountResponse {
  userId:string
}

export interface RegisterResponseInterface {
  userId:string
};

/** Api Response */
export interface LoginApiResponse {
  success: boolean;
  errrodf: string;
  statusCode: number;
  data: LoginResponseInterface;
};

/** Note: Forgot account ApiResponse */
export interface ForgotAccountApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: ForgotAccountResponse;
}

/** Note: Register user and verify otp */
export interface RegisterApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data:RegisterResponseInterface
};

export interface ACCESS_REFRESH_TOKEN_INTERFACE {
  refreshToken:string,
  accessToken:string
}

/** Note: Verify Registeration AccountOtp Response.*/
export interface VerifyRegisterationAccountOtpResponse {
  user:UserDocumentInterface,
  tokens:ACCESS_REFRESH_TOKEN_INTERFACE
}

/** Note: Verify Registeration AccountOtp Response. */
export interface VerifyRegisterationAccountOtpApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data:VerifyRegisterationAccountOtpResponse
};

/** Note: Verify Forgot Account OtpResponse */
export interface VerifyForgotAccountOtpResponse {
  resetToken:string
};

/** Note: Verify Forgot AccountOtp Api Response */
export interface VerifyForgotAccountOtpApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data:VerifyForgotAccountOtpResponse
};

/** Note: Reset Password Response */
export interface VerifyForgotAccountResetTokenApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data:[]
};

/** Note: LoggedIn User Response */
export type LoggedInUserResponse = UserDocumentInterface;

/** Note: LoggedIn User Api Response */
export interface LoggedInUserApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data:LoggedInUserResponse
}

/** Note: Refresh Access Token Api Response */
export interface RefreshAccessTokenApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data:ACCESS_REFRESH_TOKEN_INTERFACE
}