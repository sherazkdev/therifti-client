import type { OtpRequestInterface } from "../../Auth.types"

/** @note: Forgot password form interface */
export interface ForgotPasswordFormInterface {
    email:string
};

/** @note: Forgot password props interface */
export interface ForgotPasswordPropsInterface {
    onSubmit:(otpRequest:OtpRequestInterface) => void
}