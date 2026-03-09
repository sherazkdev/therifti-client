
let accessToken:string | null = null;

// @note: Save access token in memory
export function saveAccessToken(accessToken:string) {
  localStorage.setItem("accessToken",accessToken);
  return;
}

// @note: Get access token from memory
export function getAccessToken() {
  return accessToken;
}

// @note: Save refresh token in secure storage
export function saveRefreshToken(refreshToken:string) {
  localStorage.setItem("refreshToken",refreshToken);
  return;
}

// @note: Get refresh token from secure storage
export async function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}


/** @note: Remove access and refresh token */
export async function removeAccessAndRefreshToken(){
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return;
}
