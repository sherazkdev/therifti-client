/** Note: Save access token in local storage */
export const saveAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

/** Note: Get access token to local storage */
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

/** Note: Save refresh token in local storage */
export const saveRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};

/** Note: Get refresh token to local storage */
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

/** Note: Remove access and refresh cookies. */
export const removeAccessAndRefreshToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}