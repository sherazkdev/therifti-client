
import type {UserDocumentInterface} from "../../types/auth/auth.types";

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
  zipCode:number | null
};

/** @note: Verify registeration otp. */
export interface VerifyRegisterationAccountOtpInterface {
  userId:string,
  otp:string
};

/** @note: Login response. */
export type LoginResponseInterface = UserDocumentInterface;

export interface RegisterResponseInterface {
  userId:string
};

/** Api Response */
export interface LoginApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: LoginResponseInterface;
};

/** Note: Register user and verify otp */
export interface RegisterApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data:RegisterResponseInterface
};

/** Note: Verify Registeration AccountOtp Response. */
export interface VerifyRegisterationAccountOtpApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data:UserDocumentInterface
}