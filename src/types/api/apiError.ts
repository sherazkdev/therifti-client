/** Import Errro Codes */
import type { AuthErrorCodes } from "../../constants/errors/auth.errors";

export interface ApiError {
    success?: boolean;
    message: AuthErrorCodes;
    statusCode: number;
    errors:any[]
}