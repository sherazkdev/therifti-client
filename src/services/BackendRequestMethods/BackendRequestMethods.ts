import axios,{type AxiosInstance, type AxiosResponse} from "axios";
import { getAccessToken } from "../api/auth/auth";

class BackendRequestMethods {
    private api:AxiosInstance;

    constructor(baseURL: string){

        /** Note: Api Base Service */
        this.api = axios.create({
            baseURL,
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
            (err) => {
                if(err.response?.data?.stack?.includes("jwt expired") && window.location.pathname !== "/session-refresh"){
                    /** To Session Refresh */
                    window.location.href = '/session-refresh';
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
    }

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
}

export default BackendRequestMethods;