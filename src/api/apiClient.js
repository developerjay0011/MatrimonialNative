import axios from 'axios';
import Url from '../utils/url';
import { StorageService } from '../utils/storage';

const BaseUrl = `${Url.BaseUrl}/api/v1/`

const apiClient = axios.create({
    baseURL: BaseUrl,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await StorageService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => { return Promise.reject(error) }
);

apiClient.interceptors.response.use(
    (response) => {
        if (response?.data) {
            if ((!response?.data?.success && response?.data?.hasOwnProperty("success"))) {
                var message = `${response?.config?.url?.replace(BaseUrl, '')} => ${response?.status || response?.data?.status} => ${response?.config?.method} => ${response?.config?.data ? JSON.stringify(response?.config?.data) : ""} => ${response?.data ? JSON.stringify(response?.data) : ""}`;
                console.log(message)
            }
        }
        var timeTaken = response?.config?.api_call_time ? (new Date() - response?.config?.api_call_time) / 1000 : ""
        if (timeTaken > 5) {
            console.warn(`time taken ${response?.config?.url?.replace(BaseUrl, '')}`, timeTaken + " seconds");
        }
        return response
    },
    (error) => {
        var message = `${error?.response?.config?.url?.replace(BaseUrl, '')} => ${error?.response?.status || error?.response?.data?.status} => ${error?.response?.config?.method} => ${error?.response?.config?.params ? JSON.stringify(error?.response?.config?.params) : ""} => ${error?.response?.data ? JSON.stringify(error?.response?.data) : ""}`;
        console.error(message)
        return Promise.reject(error);
    }
);

export default apiClient;
