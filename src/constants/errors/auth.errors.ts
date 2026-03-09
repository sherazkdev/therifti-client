export const AUTH_ERROR_MESSAGES = {
  EMAIL_EXISTS: "This email is already registered.",
  INVALID_CREDENTIALS: "Incorrect email or password.",
  USERNAME_EXISTS: "This username is already taken.",
  TOKEN_EXPIRED: "Your session has expired. Please login again.",
  REFRESH_TOKEN_NOT_FOUND: "Session refresh token missing.",
  OTP_NOT_FOUND: "Verification code not found.",
  INVALID_OTP: "Invalid verification code.",
  OAUTH_EMAIL_NOT_PROVIDED: "Authentication failed. Please use another sign-in method.",
  EMAIL_NOT_FOUND: "No account found with this email.",
  TOKEN_NOT_FOUND: "Authentication token not found.",
  TOKEN_IS_USED: "This token has already been used.",
  OTP_EXPIRED: "Verification code has expired.",
  ACCESS_TOKEN_NOT_FOUND: "Access token missing.",
  TOKEN_INVALID: "Invalid authentication token.",
  UNAUTHORIZED: "Unauthorized access",
  VALIDATION_FAILED: "VALIDATION_FAILED"
} as const;

/** Note: Get Union Types */
export type AuthErrorCodes = keyof typeof AUTH_ERROR_MESSAGES;