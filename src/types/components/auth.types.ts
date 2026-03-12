import type { UserDocumentInterface } from "../api";

/** @note: Auth Steps */
export type AuthSteps =
  | "SOCIAL-AUTH"
  | "SIGNIN-EMAIL"
  | "FORGOT"
  | "OTP"
  | "CHANGE-PASSWORD"
  | "SIGNUP-EMAIL";

/** @note: Otp verify props interface */
export interface OtpVerifyPropsInterface {
    onSuccess: (userDocument?:UserDocumentInterface | null,resetToken?:string | null) => void,
    otpRequest: OtpRequestInterface,
    type: AuthFlow
}

/** @note: Otp flow */
export type AuthFlow = "FORGOT" | "SIGNUP" | "SIGNIN" | null;

/** @note: Social Auth Methdos */
export type SocialAuthInterface = "GOOGLE" | "APPLE" | "FACEBOOK";

/** @note: Otp request interface */
export interface OtpRequestInterface {
  email: string | null;
  userId: string | null;
  resetToken: string | null;
};

/** @note: Change Password form interface */
export interface ChangePasswordFormInterface  {
  password: string;
  confirmPassword: string;
};

/** @note: Change Password Props interface */
export interface ChangePasswordPropsInterface {
    onSuccess:() => void,
    otpRequest:OtpRequestInterface
};

/** @note: Email login form interface */
export interface EmailLoginFormInterface {
  email: string;
  password: string;
};

/** @note: Email login Props interface */
export interface EmailLoginPropsInterface {
  onForgot:() => void,
  onSuccess:(userDocument:UserDocumentInterface) => void
};

/** @note: Forgot password form interface */
export interface ForgotPasswordFormInterface {
    email:string
};

/** @note: Forgot password props interface */
export interface ForgotPasswordPropsInterface {
    onSubmit:(otpRequest:OtpRequestInterface) => void
};

/** @note: SignUp Form Interface */
export interface SignUpFormInterface {
  fullname: string;
  username: string;
  email: string;
  password: string;
  zipCode?: string;
  terms: boolean;
};

/** @note: SignUp email props interface */
export interface SignUpEmailPropsInterface {
    onSubmit: (otpRequest:OtpRequestInterface) => void
};

/** @note: SignUp with social Props interface. */
export interface SignUpSocialPropsInterface {
    onEmailSignUp: () => void,
    onSignInClick: () => void
};

/** @note:Social Auth Props Interface */
export interface SocialAuthPropsInterface {
    type:AuthFlow,
    onEmailClick: () => void,
    onSwitchMode: (type:AuthFlow) => void,
    onSocialAuth: (type:SocialAuthInterface) => void
}
