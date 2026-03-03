import type { OtpRequestInterface } from "../../Auth.types";

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
}
