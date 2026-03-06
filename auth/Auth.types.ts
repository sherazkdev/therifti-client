/** @note: Auth Steps */
export type AuthSteps =
  | "SOCIAL-AUTH"
  | "SIGNIN-EMAIL"
  | "FORGOT"
  | "OTP"
  | "CHANGE-PASSWORD"
  | "SIGNUP-EMAIL";

/** @note: Otp flow */
export type AuthFlow = "FORGOT" | "SIGNUP" | "SIGNIN" | null;

/** @note: Social Auth Methdos */
export type SocialAuthInterface = "GOOGLE" | "APPLE" | "FACEBOOK";

/** @note: Otp request interface */
export interface OtpRequestInterface {
  email: string | null;
  userId: string | null;
  resetToken: string | null;
}