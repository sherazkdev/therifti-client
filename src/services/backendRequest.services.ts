import axios,{AxiosError, type AxiosInstance, type AxiosResponse} from "axios";
import { getAccessToken, getRefreshToken, removeAccessAndRefreshToken, saveAccessToken, saveRefreshToken } from "../services/auth.services";
import type { ApiError } from "../types/api/index";

class BackendRequestServices {
    private api:AxiosInstance;

    constructor(baseURL: string){

        /** Note: Api Base Service */
        this.api = axios.create({
            baseURL:`${baseURL}/api/v1`,
            withCredentials:true,
            timeout:10000
        });

        this.api.interceptors.request.use( async (config) => {
            const accessToken = getAccessToken();
            if(accessToken){
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        },err => Promise.reject(err));

        this.api.interceptors.response.use( async (response) => response,
            async (err:any) => {
                let orignalRequest = err.config;
                if(err && err.response && err.response.data?.stack?.includes("jwt expired") && !orignalRequest._retry){
                    const memoryRefreshToken = await getRefreshToken();
                    if(!memoryRefreshToken){
                        removeAccessAndRefreshToken();
                        return Promise.reject(err);
                    }
                    try {
                        /** To Session Refresh */
                        const response = await this.api.post("/auth/refresh-token",{refreshToken:memoryRefreshToken});
                        const {accessToken,refreshToken} = response.data.data;
                        /** Note: Store Access and Refresh Token */
                        saveAccessToken(accessToken);
                        saveRefreshToken(refreshToken);
                        /** Note: Set Authorization Bearer ${accessToken} */
                        orignalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                        orignalRequest._retry = true;
                        
                        return this.api(orignalRequest);
                    } catch (e:unknown) {
                        if(e instanceof AxiosError){
                            const err = (e.response?.data as ApiError) || undefined;
                            if(err){
                                if(err.message === "TOKEN_INVALID" || err.message === "TOKEN_EXPIRED" || err.message === "TOKEN_IS_USED"){
                                    removeAccessAndRefreshToken();
                                    return Promise.reject(err)
                                }else if(err.message === "VALIDATION_FAILED"){ 
                                    return Promise.reject(err)
                                }
                            }
                            return Promise.reject(e);
                        }
                    }
                    return Promise.reject(err);
                }
                return Promise.reject(err);
            }
        )
    }
    
    /**
     * Note: Sends a GET request to the specified URL with optional query parameters.
     *
     * @template T - The expected type of the response data.
     * @param {string} url - The endpoint URL relative to the base API.
     * @param {object} [params] - Optional query parameters to include in the request.
     * @returns {Promise<T>} A promise that resolves to the response data of type T.
     * @throws {AxiosError} Throws an error if the request fails.
     */
    public async Get<T>(url: string, params?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.api.get(url, { params });
        return response.data;
    };

    /**
     * Note: Sends a POST request to the specified URL with a request body.
     *
     * @template T - The expected type of the response data.
     * @param {string} url - The endpoint URL relative to the base API.
     * @param {object} [body] - Optional request payload to send in the POST request.
     * @returns {Promise<T>} A promise that resolves to the response data of type T.
     * @throws {AxiosError} Throws an error if the request fails.
     */
    public async Post<T>(url: string, body?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.api.post(url, body);
        return response.data;
    }

    /**
     * Note: Sends a PUT request to the specified URL with a request body.
     *
     * @template T - The expected type of the response data.
     * @param {string} url - The endpoint URL relative to the base API.
     * @param {object} [body] - Optional request payload to send in the PUT request.
     * @returns {Promise<T>} A promise that resolves to the response data of type T.
     * @throws {AxiosError} Throws an error if the request fails.
     */
    public async Patch<T>(url: string, body?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.api.patch(url, body);
        return response.data;
    }

    /**
     * Note: Sends a DELETE request to the specified URL.
     *
     * @template T - The expected type of the response data.
     * @param {string} url - The endpoint URL relative to the base API.
     * @returns {Promise<T>} A promise that resolves to the response data of type T.
     * @throws {AxiosError} Throws an error if the request fails.
     */
    public async Delete<T>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await this.api.delete(url);
        return response.data;
    }

    // Note: Sends a GET request to an external URL without using the base API.
    public async ExternalGet<T>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await axios.get(url);
        return response.data;
    }
    // Note: Sends a POST request to an external URL without using the base API.
    public async ExternalPost<T>(url: string, body?: any): Promise<T> {
        const response: AxiosResponse<T> = await axios.post(url, body);
        return response.data;
    }
}

export default BackendRequestServices;