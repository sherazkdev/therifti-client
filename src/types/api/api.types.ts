/** Import Errro Codes */
import type { AuthErrorCodes } from "../../constants/errors/auth.errors";

interface errorType {
    field:string,
    message:string
}
export interface ApiError {
    success?: boolean;
    message: AuthErrorCodes;
    statusCode: number;
    errors:errorType[]
}