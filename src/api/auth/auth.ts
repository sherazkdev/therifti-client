import * as SecureStore from 'expo-secure-store';

let accessToken:string | null = null;

// @note: Save access token in memory
export function saveAccessToken(accessToken:string) {
  accessToken = accessToken;
}

// @note: Get access token from memory
export function getAccessToken() {
  return accessToken;
}

// @note: Save refresh token in secure storage
export async function saveRefreshToken(refreshToken:string) {
  await SecureStore.setItemAsync('refreshToken', refreshToken);
}

// @note: Get refresh token from secure storage
export async function getRefreshToken() {
  return await SecureStore.getItemAsync('refreshToken');
}

// @note: Remove tokens (logout)
export async function clearTokens() {
  accessToken = null;
  await SecureStore.deleteItemAsync('refreshToken');
}