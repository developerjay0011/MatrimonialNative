import { showToast } from '../../utils/toast';
import { postData, postFormData } from '../../api/apiRequest';
import { navigate } from '../../navigation/RootNavigation';
import { StorageService } from '../../utils/storage';

const AUTH_ENDPOINTS = {
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
    SEND_OTP: 'auth/otp/send',
    VERIFY_OTP: 'auth/otp/verify',
    REFRESH_TOKEN: 'auth/refresh-token',
    LOGOUT: 'auth/logout',
};

export const registerUser = (userData: any) => {
    return async (dispatch: any) => {
        try {
            const formData = new FormData();

            formData.append('email', userData.email);
            formData.append('phone', `+91${userData.phone}`);
            formData.append('password', userData.password);
            formData.append('fullName', userData.fullName);
            formData.append('age', userData.age);
            formData.append('dateOfBirth', userData.dateOfBirth);
            formData.append('gender', userData.gender);
            formData.append('city', userData.city);
            formData.append('occupation', userData.occupation);
            formData.append('currentState', userData.currentState);

            if (userData.photos && Array.isArray(userData.photos)) {
                userData.photos.forEach((photo: any) => {
                    if (photo.uri) {
                        formData.append('photos', {
                            uri: photo.uri,
                            type: photo.type || 'image/jpeg',
                            name: photo.name || 'photo.jpg',
                        });
                    }
                });
            }

            const response = await postFormData(AUTH_ENDPOINTS.REGISTER, { data: formData, showConsole: true });

            if (response?.data?.success && response?.data?.data) {
                await StorageService.setAccessToken(response.data.data.accessToken);
                await StorageService.setRefreshToken(response.data.data.refreshToken);
                await StorageService.setUserData(response.data.data.user);
            }

            showToast(response?.data?.message, { type: response?.data?.success ? 'success' : 'error' });
            userData?.setLoading(false);

            if (response?.data?.success) { navigate('Login') }
        } catch (error: any) {
            userData?.setLoading(false);
            showToast(error?.message, { type: 'error' });
            throw error;
        }
    };
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await postData(AUTH_ENDPOINTS.LOGIN, {
            data: credentials,
            showConsole: true,
        });

        if (response?.data?.success && response?.data?.data) {
            await StorageService.setAccessToken(response.data.data.accessToken);
            await StorageService.setRefreshToken(response.data.data.refreshToken);
            await StorageService.setUserData(response.data.data.user);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendOTP = async (phone: string) => {
    try {
        const response = await postData(AUTH_ENDPOINTS.SEND_OTP, {
            data: { phone },
            showConsole: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyOTP = async (phone: string, otp: string) => {
    try {
        const response = await postData(AUTH_ENDPOINTS.VERIFY_OTP, {
            data: { phone, otp },
            showConsole: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const refreshToken = await StorageService.getRefreshToken();
        const response = await postData(AUTH_ENDPOINTS.REFRESH_TOKEN, {
            data: { refreshToken },
            showConsole: true,
        });

        if (response?.data?.success && response?.data?.data) {
            await StorageService.setAccessToken(response.data.data.accessToken);
            await StorageService.setRefreshToken(response.data.data.refreshToken);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const refreshToken = await StorageService.getRefreshToken();
        const response = await postData(AUTH_ENDPOINTS.LOGOUT, {
            data: { refreshToken },
            showConsole: true,
        });

        await StorageService.clearAuth();
        navigate('Login' as never);

        return response.data;
    } catch (error) {
        await StorageService.clearAuth();
        navigate('Login' as never);
        throw error;
    }
};
