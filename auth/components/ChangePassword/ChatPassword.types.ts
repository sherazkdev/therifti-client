import type { OtpRequestInterface } from "../../Auth.types";

/** @note: Change Password form interface */
export interface ChangePasswordFormInterface  {
  password: string;
  confirmPassword: string;
};

/** @note: Change Password Props interface */
export interface ChangePasswordPropsInterface {
    onSuccess:() => void,
    otpRequest:OtpRequestInterface
}