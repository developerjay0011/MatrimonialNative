import Url from '../utils/url';
import apiClient from './apiClient';

const BaseUrl = `${Url.BaseUrl}/api/`

const getHeaders = (params) => {
    const { method, data, academicYear, query, ...rest } = params;
    return rest
}

export const getData = async (url, params = {}) => {
    var headers = getHeaders(params);
    headers.api_call_time = new Date()
    var requestParams = params?.params || {};
    var endPoint = url?.replace(BaseUrl, "");
    if (params?.showConsole) {
        console.warn("getData", endPoint)
    }
    return apiClient.get(endPoint, { ...headers, params: requestParams });
}

export const postData = async (url, params = {}) => {
    var data = Array.isArray(params?.data) ? [...params?.data] : { ...params?.data }
    var headers = getHeaders(params);
    headers.api_call_time = new Date()
    var endPoint = url?.replace(BaseUrl, "");
    if (params?.showConsole) {
        console.warn("postData", endPoint, data)
    }
    return apiClient.post(endPoint, data, headers);
}

export const postFormData = async (url, params = {}) => {
    var headers = getHeaders(params);
    headers.api_call_time = new Date()
    var endPoint = url?.replace(BaseUrl, "");
    const formData = new FormData();
    if (params.data?._parts) {
        params.data?._parts?.forEach(([key, value]) => { formData.append(key, value) });
    }
    console.log('formData', formData, endPoint);
    return apiClient.postForm(endPoint, formData, headers);
}

export const putData = async (url, params = {}) => {
    var data = Array.isArray(params?.data) ? [...params?.data] : { ...params?.data }
    var headers = getHeaders(params);
    headers.api_call_time = new Date()
    var endPoint = url?.replace(BaseUrl, "");
    if (params?.showConsole) {
        console.warn("putData", endPoint, data)
    }
    return apiClient.put(endPoint, data, headers);
}

export const deleteData = async (url, params = {}) => {
    try {
        var headers = getHeaders(params);
        headers.api_call_time = new Date()
        var requestParams = params?.params || {};
        var endPoint = url?.replace(BaseUrl, "");
        return apiClient.delete(endPoint, { ...headers, params: requestParams });
    } catch (error) {
        console.error("deleteData", error)
    }
}