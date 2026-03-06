import type { UserDocumentInterface } from "../../../../types/auth/auth.types";
import type { AuthFlow, OtpRequestInterface } from "../../Auth.types";

/** @note: Otp verify props interface */
export interface OtpVerifyPropsInterface {
    onSuccess: (userDocument?:UserDocumentInterface | null,resetToken?:string | null) => void,
    otpRequest: OtpRequestInterface,
    type: AuthFlow
}