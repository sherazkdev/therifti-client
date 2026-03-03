import type { UserDocumentInterface } from "../../../../types/auth/auth.types";
import type { AuthFlow, OtpRequestInterface } from "../../Auth.types";

/** @note: Otp verify props interface */
export interface OtpVerifyPropsInterface {
    onSuccess: (userDocument:UserDocumentInterface) => void,
    otpRequest: OtpRequestInterface,
    type: AuthFlow
}